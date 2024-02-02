import { Component, HostListener } from '@angular/core';
import { TodoService } from '../../../../services/facade/todo.service';
import { ITodoLists } from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';

@Component({
    selector: 'todo-container',
    templateUrl: './todo-view.component.html',
    styleUrl: './todo-view.component.css',
})
export class TodoViewComponent {
    // Todo's List Properties
    todoList!: ITodoLists;
    todoListTypes = TodoListTypes;

    private todoListsSubscription: Subscription;

    constructor(
        private dialog: MatDialog,
        private readonly todoService: TodoService,
    ) {
        this.todoList = {
            todoList: [],
            trashList: [],
        };

        // this.trashTodoList.list = [];

        this.todoListsSubscription = this.todoService.todoList$.subscribe(
            (items) => {
                if (items) {
                    this.todoList.todoList = items?.todoList;
                    this.todoList.trashList = items?.trashList;
                }
            },
        );
    }

    @HostListener('window:beforeunload')
    unloadNotification() {
        window.localStorage.setItem(
            'todo-list',
            JSON.stringify(this.todoList.todoList),
        );

        window.localStorage.setItem(
            'todo-trash-list',
            JSON.stringify(this.todoList.trashList),
        );
    }

    async ngOnInit() {
        this.todoList.todoList =
            await this.todoService.getTodosFromLocalStorage();
    }

    ngOnDestroy() {
        this.todoListsSubscription.unsubscribe();
    }

    // get description() {
    //     return this.todosAddForm.get('description');
    // }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(TodoFormDialogComponent, dialogConfig);
    }
}
