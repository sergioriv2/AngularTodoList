import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormService } from './services/form.service';
import { MainFormComponent } from './components/main-form/main-form.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { AuthService } from '../features/auth/services/auth.service';

export const SHARED_MODULES = [FormFieldComponent, MainFormComponent];

@NgModule({
    declarations: [...SHARED_MODULES],
    providers: [
        FormService,
        AuthService,
        {
            provide: RECAPTCHA_V3_SITE_KEY,
            useValue: environment.recaptcha.siteKey,
        },
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RecaptchaV3Module,
    ],
    exports: [...SHARED_MODULES],
})
export class SharedModule {}
