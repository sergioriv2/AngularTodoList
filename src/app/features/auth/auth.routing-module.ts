import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutesEnum } from '../../shared/routes/app-routes.enum';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Route[] = [
    {
        path: AppRoutesEnum.Blank,
        component: AuthComponent,
        children: [
            {
                path: 'signup',
                component: SignupComponent,
            },
            {
                path: AppRoutesEnum.Login,
                component: LoginComponent,
            },
            {
                path: AppRoutesEnum.Blank,
                redirectTo: AppRoutesEnum.Login,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
