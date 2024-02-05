import { NgModule } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth.routing-module';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import {
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

const SHARED_COMPONENTS: any = [
    LoginComponent,
    AuthComponent,
    LoginFormComponent,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [
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
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class AuthModule {}
