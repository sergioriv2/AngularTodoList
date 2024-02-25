import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutesEnum } from '../../shared/routes/app-routes.enum';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';

const routes: Route[] = [
    {
        path: AppRoutesEnum.Blank,
        component: AuthComponent,
        children: [
            {
                path: AppRoutesEnum.Signup,
                component: SignupComponent,
            },
            {
                path: AppRoutesEnum.Login,
                component: LoginComponent,
            },
            {
                path: AppRoutesEnum.AccountActivation,
                component: AccountActivationComponent,
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
