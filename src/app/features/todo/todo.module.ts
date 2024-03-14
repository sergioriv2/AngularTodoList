import { NgModule } from '@angular/core';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoFormDialogComponent } from './components/todo-form-dialog/todo-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoCleanDialogComponent } from './components/todo-clean-dialog/todo-clean-dialog.component';
import { AuthService } from '../auth/services/auth.service';
import { TodoRoutingModule } from './todo.routing-module';
import { CreateTodoButton } from './components/create-todo-button/create-todo-button.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ResponsiveSidebar } from './components/responsive-sidebar/responsive-sidebar.component ';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppViewComponenet } from './components/app-view/app-view.component';
import { TodoCompletedListsView } from './components/todo-completed-lists-view/todo-completed-lists.view';
import { TodoTrashListView } from './components/todo-trash-list-view/todo-trash-list.view';
import { ResponsiveHeadbar } from './components/responsive-headbar/responsive-headbar.component';

const SHARED_COMPONENTS = [
    TodoDetailsComponent,
    TodoViewComponent,
    TodoListComponent,
    TodoFormDialogComponent,
    TodoCleanDialogComponent,
    CreateTodoButton,
    ResponsiveSidebar,
    TodoCompletedListsView,
    TodoTrashListView,
    ResponsiveHeadbar,
    AppViewComponenet,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [TodoService, AuthService, provideNativeDateAdapter()],
    imports: [
        TodoRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatDatepickerModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class TodoModule {}
