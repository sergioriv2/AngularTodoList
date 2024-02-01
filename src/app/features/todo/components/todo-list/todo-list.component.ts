import { Component, Input } from '@angular/core';
import {
    ITodoDetail,
    ITodoLists,
} from '../../interfaces/todo-details.interface';
import { TodoService } from '../../../../services/facade/todo.service';
import { Subscription } from 'rxjs';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
    @Input()
    listName!: string;

    @Input()
    todoList: ITodoDetail[] = [];

    @Input()
    todoType!: TodoListTypes;
    todoListTypes = TodoListTypes;

    constructor(private readonly todoService: TodoService) {
        this.todoList = this.todoList.map((el) => {
            return {
                ...el,
                isInTrash: this.todoType === TodoListTypes.Trash,
            };
        });
    }

    async cleanList() {
        if (this.todoType === TodoListTypes.Todo) {
            await this.todoService.setTodoList({
                todoList: [],
            });
            this.todoList = [];
        } else {
            await this.todoService.setTodoList({
                trashList: [],
            });
            this.todoList = [];
        }
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
