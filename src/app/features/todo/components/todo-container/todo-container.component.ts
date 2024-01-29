import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../../services/facade/todo.service';
import {
    ITodoDetail,
    ITodoList,
} from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { generateRandomNumber } from '../../../../helpers/generate-random-number';

@Component({
    selector: 'todo-container',
    templateUrl: './todo-container.component.html',
    styleUrl: './todo-container.component.css',
})
export class TodoContainerComponent {
    todosAddForm: FormGroup;
    newTodo: ITodoDetail | undefined;
    // Todo's List Properties
    todoList!: ITodoList;
    trashTodoList!: ITodoList;

    private todoSubscription: Subscription;

    constructor(private readonly todoService: TodoService) {
        this.todoList = {
            list: [],
        };
        this.trashTodoList = {
            list: [],
        };
        // this.trashTodoList.list = [];

        this.todoSubscription = this.todoService
            .getTodoObservable()
            .subscribe((items) => {
                this.todoList.list = items;
            });

        this.todosAddForm = new FormGroup({
            description: new FormControl(this.newTodo?.description, [
                Validators.required,
            ]),
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        window.localStorage.setItem(
            'todo-list',
            JSON.stringify(this.todoList.list),
        );
    }

    async ngOnInit() {
        this.todoList.list = await this.todoService.getTodosFromLocalStorage();
    }

    ngOnDestroy() {
        this.todoSubscription.unsubscribe();
    }

    get description() {
        return this.todosAddForm.get('description');
    }

    async onTodosAddSubmit() {
        if (this.todosAddForm.valid) {
            this.newTodo = {
                id: generateRandomNumber(),
                description:
                    this.todosAddForm.controls['description'].value ?? '',
                isComplete: false,
                isInTrash: false,
            };

            await this.todoService.addTodo(this.newTodo);

            this.todosAddForm.reset();
            this.newTodo = undefined;
        }
    }
}
