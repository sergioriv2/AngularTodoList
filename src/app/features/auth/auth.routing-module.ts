import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutesEnum } from '../../shared/routes/app-routes.enum';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
    {
        path: AppRoutesEnum.Blank,
        pathMatch: 'full',
        redirectTo: AppRoutesEnum.Login,
    },
    {
        path: AppRoutesEnum.Blank,
        component: AuthComponent,
        children: [
            {
                path: AppRoutesEnum.Login,
                component: LoginComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
