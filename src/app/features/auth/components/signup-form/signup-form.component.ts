import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignupForm } from '../../interfaces/signup-form.interface';
import { AuthService } from '../../services/auth.service';
import { SignupDto } from '../../dtos/signup.dto';
import { IAccountActivationForm } from '../../interfaces/activation-form.interface';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
    form!: FormGroup;
    formData: ISignupForm;

    accountActivationForm!: FormGroup;
    accountActivationFormData: IAccountActivationForm;

    // States
    buttonDisabled: boolean;
    showAccountActivationForm: boolean;
    showSignupForm: boolean;

    constructor(
        private readonly authService: AuthService,
        private formBuilder: FormBuilder,
    ) {
        this.buttonDisabled = false;
        this.showAccountActivationForm = false;
        this.showSignupForm = true;

        this.formData = {
            email: '',
            password: '',
            username: '',
        };

        this.accountActivationFormData = {
            code: '',
        };
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: [
                this.formData.email,
                [Validators.required, Validators.email],
            ],
            username: [this.formData.email, [Validators.required]],
            password: [
                this.formData.password,
                [Validators.required, Validators.minLength(8)],
            ],
        });

        this.accountActivationForm = this.formBuilder.group({
            code: [this.accountActivationFormData.code, [Validators.required]],
        });
    }

    async onSubmit() {
        const signupPayload: SignupDto = {
            ...this.formData,
        };

        this.buttonDisabled = true;
        const userWasSignedUp = await this.authService.signupUser(
            signupPayload,
        );
        this.buttonDisabled = false;

        if (!userWasSignedUp) {
            this.showAccountActivationForm = true;
        }
    }
}
