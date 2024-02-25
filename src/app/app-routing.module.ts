import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './shared/routes/app-routes.enum';
import { AuthGuard } from './guards/auth.guard';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';

const routes: Routes = [
    {
        path: AppRoutesEnum.Auth,
        canActivate: [AlreadyLoggedInGuard],
        loadChildren: () =>
            import('./features/auth/auth.module').then((x) => x.AuthModule),
    },
    {
        path: AppRoutesEnum.App,
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./features/todo/todo.module').then((x) => x.TodoModule),
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
