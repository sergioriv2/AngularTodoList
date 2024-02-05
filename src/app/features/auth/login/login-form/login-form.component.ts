import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginForm } from './login-form.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    formData: ILoginForm;
    private formValuesSubscription!: Subscription;

    constructor(private formBuilder: FormBuilder) {
        this.formData = {
            email: '',
            password: '',
        };
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: [
                this.formData.email,
                [Validators.required, Validators.email],
            ],
            password: [
                this.formData.password,
                [Validators.required, Validators.minLength(8)],
            ],
        });

        this.formValuesSubscription = this.form.valueChanges.subscribe(
            (values) => {
                this.formData = values;
            },
        );
    }

    onSubmit() {
        console.log({
            formData: this.formData,
            valid: this.form.valid,
        });
    }

    ngOnDestroy(): void {
        this.formValuesSubscription.unsubscribe();
    }
}
