import { NgModule } from '@angular/core';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/facade/todo.service';

const SHARED_COMPONENTS = [
    TodoDetailsComponent,
    TodoContainerComponent,
    TodoListComponent,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [TodoService],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [...SHARED_COMPONENTS],
})
export class TodoModule {}
