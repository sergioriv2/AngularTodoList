import { NgModule } from '@angular/core';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/facade/todo.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoFormDialogComponent } from './components/todo-form-dialog/todo-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoCleanDialogComponent } from './components/todo-clean-dialog/todo-clean-dialog.component';

const SHARED_COMPONENTS = [
    TodoDetailsComponent,
    TodoViewComponent,
    TodoListComponent,
    TodoFormDialogComponent,
    TodoCleanDialogComponent,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [TodoService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class TodoModule {}
