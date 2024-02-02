import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoViewComponent } from './features/todo/components/todo-view/todo-view.component';
import { AppRoutesEnum } from './shared/routes/app-routes.enum';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
            import('./features/auth/auth.module').then((x) => x.AuthModule),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: AppRoutesEnum.TodoList,
        component: TodoViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
