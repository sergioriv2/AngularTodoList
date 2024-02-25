import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutesEnum } from '../../shared/routes/app-routes.enum';
import { TodoViewComponent } from './components/todo-view/todo-view.component';

const routes: Route[] = [
    {
        path: AppRoutesEnum.Blank,
        children: [
            {
                path: AppRoutesEnum.TodoList,
                component: TodoViewComponent,
            },
            {
                path: AppRoutesEnum.Blank,
                redirectTo: AppRoutesEnum.TodoList,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TodoRoutingModule {}
