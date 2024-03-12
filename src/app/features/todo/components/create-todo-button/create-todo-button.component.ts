import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoFormDialogComponent } from '../todo-form-dialog/todo-form-dialog.component';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'create-todo-button',
    templateUrl: './create-todo-button.component.html',
    styleUrls: [
        '../todo-details/todo-details.component.css',
        './create-todo-button.component.css',
    ],
})
export class CreateTodoButton {
    @Input()
    dateDetails!: string;

    constructor(private readonly dialog: MatDialog) {}

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            dateDetails: this.dateDetails,
        };

        this.dialog.open(TodoFormDialogComponent, dialogConfig);
    }
}
