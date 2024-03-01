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
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AccountActivationForm } from './components/account-activation-form/account-activation-form.component';
import {
    GoogleLoginProvider,
    GoogleSigninButtonModule,
    MicrosoftLoginProvider,
    SocialAuthServiceConfig,
    SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { ExternalSignupOptionComponent } from './components/external-signup-option/external-signup-option.component';
import { environment } from '../../../environments/environment';
import { ExternalSignupService } from './services/external-signup.service';
import { CodeInputModule } from 'angular-code-input';

const SHARED_COMPONENTS: any = [
    LoginComponent,
    AuthComponent,
    LoginFormComponent,
    SignupComponent,
    SignupFormComponent,
    FormFieldErrorList,
    AccountActivationComponent,
    AccountActivationForm,
    ExternalSignupOptionComponent,
];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [
        ExternalSignupService,
        FormService,
        AuthService,
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher,
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment.socialAuth.google.clientId,
                            {
                                oneTapEnabled: false,
                            },
                        ),
                    },
                    {
                        id: MicrosoftLoginProvider.PROVIDER_ID,
                        provider: new MicrosoftLoginProvider(
                            environment.socialAuth.microsoft.clientId,
                            {
                                redirect_uri: 'http://localhost:4200/app',
                                authority: `https://login.microsoftonline.com/${environment.socialAuth.microsoft.tenantId}`,
                            },
                        ),
                    },
                ],
                onError: (err) => {
                    console.error(err);
                },
            } as SocialAuthServiceConfig,
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
        SocialLoginModule,
        GoogleSigninButtonModule,
        CodeInputModule,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class AuthModule {}
