import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginForm } from '../../interfaces/login-form.interface';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SignInDto } from '../../dtos/signin.dto';
import { Router } from '@angular/router';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { APILoginResponse } from '../../models/auth-responses.interface';
import { isStringArray } from '../../../../helpers/form-helpers';
import { APIResponseError } from '../../../../shared/models/api-responses.interface';
import { FormService } from '../../../../shared/services/form.service';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    formData: ILoginForm;
    private formValuesSubscription!: Subscription;

    // States ---------------------------
    isLoading: boolean;
    loginAPIErrors: string[] = [];
    // getValidationErrorsFromForm = getValidationErrorsFromForm;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly formService: FormService,
        private formBuilder: FormBuilder,
    ) {
        this.formData = {
            email: '',
            password: '',
        };

        this.isLoading = false;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: [
                this.formData.email,
                [Validators.required, Validators.email],
            ],
            password: [
                this.formData.password,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
                    ),
                ],
            ],
        });

        this.formValuesSubscription = this.form.valueChanges.subscribe(
            (values) => {
                this.formData = values;
            },
        );
    }

    async onSubmit() {
        const signinPayload: SignInDto = {
            ...this.formData,
        };

        this.loginAPIErrors = [];
        this.formService.updateShouldShowErrors(false);
        this.isLoading = true;
        this.authService.logInUser(signinPayload).subscribe({
            next: (response) => {
                this.isLoading = false;

                if (response.payload && response.statusCode === 200) {
                    window.localStorage.setItem(
                        LocalStorageItemsEnum.ACCESS_TOKEN,
                        response.payload.accessToken,
                    );

                    window.localStorage.setItem(
                        LocalStorageItemsEnum.REFRESH_TOKEN,
                        response.payload.refreshToken,
                    );

                    this.router.navigate([AppCompleteRoutesEnum.TodoList]);
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.loginAPIErrors =
                    this.formService.handleAPIFormErrors(error);
            },
        });
    }

    ngOnDestroy(): void {
        this.formValuesSubscription.unsubscribe();
    }
}
