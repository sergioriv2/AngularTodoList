import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { ISignupForm } from '../../interfaces/signup-form.interface';
import { AuthService } from '../../services/auth.service';
import { SignupDto } from '../../dtos/signup.dto';
import { FormService } from '../../../../shared/services/form.service';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import { Subscription } from 'rxjs';
import { SessionStorageItemsEnum } from '../../../../common/enums/session-storage.enum';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: [
        './signup-form.component.css',
        '../login-form/login-form.component.css',
    ],
})
export class SignupFormComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    formData: ISignupForm;

    // States
    isLoading: boolean;
    signupAPIErrors: string[] = [];

    private formValuesSubscription!: Subscription;

    constructor(
        private readonly formService: FormService,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
    ) {
        this.isLoading = false;

        this.formData = {
            email: '',
            password: '',
            passwordConfirmation: '',
            username: '',
        };
    }
    ngOnDestroy(): void {
        this.formValuesSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {
                email: [
                    this.formData.email,
                    [Validators.required, Validators.email],
                ],
                username: [this.formData.email, [Validators.required]],
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
                passwordConfirmation: [
                    this.formData.password,
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
                        ),
                    ],
                ],
            },
            {
                validators: this.matchValidator(
                    'password',
                    'passwordConfirmation',
                ),
            },
        );

        this.formValuesSubscription = this.form.valueChanges.subscribe(
            (values) => {
                this.formData = values;
            },
        );
    }

    matchValidator(
        controlName: string,
        matchingControlName: string,
    ): ValidatorFn {
        return (abstractControl: AbstractControl) => {
            const control = abstractControl.get(controlName);
            const matchingControl = abstractControl.get(matchingControlName);

            if (
                matchingControl!.errors &&
                !matchingControl!.errors?.['passwordsDontMatch']
            ) {
                return null;
            }

            if (control!.value !== matchingControl!.value) {
                const error = { passwordsDontMatch: 'Passwords do not match.' };
                matchingControl!.setErrors(error);
                return error;
            } else {
                matchingControl!.setErrors(null);
                return null;
            }
        };
    }

    async onSubmit() {
        const signupPayload: SignupDto = {
            ...this.formData,
        };

        this.isLoading = true;

        this.authService.signupUser(signupPayload).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.payload && response.payload.emailSent) {
                    sessionStorage.setItem(
                        SessionStorageItemsEnum.EmailAccountActivation,
                        signupPayload.email,
                    );
                    this.router.navigateByUrl(
                        AppCompleteRoutesEnum.AuthAccountActivation,
                    );
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.signupAPIErrors =
                    this.formService.handleAPIFormErrors(error);
            },
        });
    }
}
