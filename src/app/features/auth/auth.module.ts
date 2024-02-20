import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth.routing-module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import {
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { SignupComponent } from './components/signup/signup.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormFieldErrorList } from '../../shared/components/form-field-error-list/form-field-error-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from '../../shared/services/form.service';

const SHARED_COMPONENTS: any = [
    LoginComponent,
    AuthComponent,
    LoginFormComponent,
    SignupComponent,
    SignupFormComponent,
    FormFieldErrorList,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [
        FormService,
        AuthService,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher,
        },
    ],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        HttpClientModule,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class AuthModule {}
