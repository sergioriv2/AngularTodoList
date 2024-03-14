import { Component, Input } from '@angular/core';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todo-details',
    templateUrl: `./todo-details.component.html`,
    styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent {
    @Input()
    todoDetails!: ITodoDetail;

    constructor(private readonly todoService: TodoService) {}

    async updateTodoOnClick() {
        if (this.todoDetails?.id === undefined) return;
        this.todoDetails.isComplete = !this.todoDetails.isComplete;
        await this.todoService.updateTodoList(this.todoDetails);
    }

    // async handleTodoThrashOnClick() {
    //     if (this.todoDetails?.id === undefined) return;
    //     await this.todoService.handleTodoTrash(this.todoDetails);
    // }

    getDateString() {
        // return ;
        return new Date(this.todoDetails.createdAt).toLocaleDateString('en-US');
    }
}
