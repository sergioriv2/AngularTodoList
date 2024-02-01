import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../../services/facade/todo.service';
import {
    ITodoDetail,
    ITodoLists,
} from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { generateRandomNumber } from '../../../../helpers/generate-random-number';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';

@Component({
    selector: 'todo-container',
    templateUrl: './todo-container.component.html',
    styleUrl: './todo-container.component.css',
})
export class TodoContainerComponent {
    todosAddForm: FormGroup;
    // Todo's List Properties
    todoList!: ITodoLists;
    todoListTypes = TodoListTypes;

    private todoListsSubscription: Subscription;

    constructor(private readonly todoService: TodoService) {
        this.todoList = {
            todoList: [],
            trashList: [],
        };

        // this.trashTodoList.list = [];

        this.todoListsSubscription = this.todoService
            .getTodoListsObservable()
            .subscribe((items) => {
                // console.log(JSON.stringify(items));
                this.todoList.todoList = items?.todoList;
                this.todoList.trashList = items?.trashList;
            });

        this.todosAddForm = new FormGroup({
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(255),
            ]),
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
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

    get description() {
        return this.todosAddForm.get('description');
    }

    async onTodosAddSubmit() {
        if (this.todosAddForm.valid) {
            const newTodo: ITodoDetail = {
                id: generateRandomNumber(),
                description:
                    this.todosAddForm.controls['description'].value ?? '',
                isComplete: false,
                isInTrash: false,
                color: this.todoService.generateRandomColor(),
            };

            console.log({
                newTodo,
            });

            await this.todoService.addTodo(newTodo);

            this.todosAddForm.reset();
        }
    }
}
