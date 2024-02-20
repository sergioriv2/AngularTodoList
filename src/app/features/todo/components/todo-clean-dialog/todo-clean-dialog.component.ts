import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';

@Component({
    templateUrl: './todo-clean-dialog.component.html',
})
export class TodoCleanDialogComponent implements OnInit {
    todoList: ITodoDetail[] = [];
    todoType: TodoListTypes;

    constructor(
        private dialogRef: MatDialogRef<TodoCleanDialogComponent>,
        private readonly todoService: TodoService,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
    ) {
        this.todoList = data.todoList;
        this.todoType = data.todoType;
    }

    ngOnInit(): void {
        this.todoList = this.data.todoList;
        this.todoType = this.data.todoType;
    }

    close() {
        this.dialogRef.close();
    }

    async cleanTrash() {
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

        this.dialogRef.close([]);
    }
}
