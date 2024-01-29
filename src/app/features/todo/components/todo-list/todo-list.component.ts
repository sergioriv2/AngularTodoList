import { Component, Input } from '@angular/core';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { TodoService } from '../../../../services/facade/todo.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
    @Input()
    todoList: ITodoDetail[] = [];

    constructor(private readonly todoService: TodoService) {}

    async cleanList() {
        this.todoList = await this.todoService.setTodoList([]);
    }
}
