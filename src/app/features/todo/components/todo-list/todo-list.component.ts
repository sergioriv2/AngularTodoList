import { Component, Input, OnDestroy } from '@angular/core';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { TodoService } from '../../services/todo.service';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoCleanDialogComponent } from '../todo-clean-dialog/todo-clean-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnDestroy {
    @Input()
    listName!: string;

    @Input()
    todoList: ITodoDetail[] = [];

    @Input()
    todoType!: TodoListTypes;

    todoListTypes = TodoListTypes;
    private listSubscription: Subscription;

    constructor(
        private cleanTrashDialog: MatDialog,
        private readonly todoService: TodoService,
    ) {
        this.listSubscription = this.todoService.todoList$.subscribe({
            next: (lists) => {
                this.todoList =
                    this.todoType === TodoListTypes.Todo
                        ? lists.todoList
                        : lists.trashList;
            },
        });
    }
    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
    }

    transformTodoList() {
        this.todoList = this.todoList.map((el) => {
            return {
                ...el,
                isInTrash: this.todoType === TodoListTypes.Trash,
            };
        });
    }

    openTrashDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.cleanTrashDialog.open(TodoCleanDialogComponent, {
            data: {
                todoType: this.todoType,
                todoList: this.todoList,
            },
        });
        dialogRef.afterClosed().subscribe((result: ITodoDetail[]) => {
            if (result) {
                this.todoList = result;
            }
        });
    }

    async restoreTodosInTrash() {
        if (this.todoType === TodoListTypes.Trash) {
            const allTodosList = await this.todoService.getAllTodosList();
            const concatenatedList = allTodosList.todoList.concat(
                allTodosList.trashList.map((el) => {
                    return {
                        ...el,
                        isInTrash: false,
                    };
                }),
            );

            await this.todoService.setTodoList({
                todoList: concatenatedList,
                trashList: [],
            });

            this.todoList = [];
        } else return;
    }
}
