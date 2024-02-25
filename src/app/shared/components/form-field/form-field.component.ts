import { Component, Injector, Input, forwardRef } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NgControl,
} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'form-field',
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldComponent),
            multi: true,
        },
    ],
})
export class FormFieldComponent implements ControlValueAccessor {
    @Input() label?: string = '';
    @Input() hasLabel: boolean = true;
    @Input() inputType: 'text' | 'email' | 'password' = 'text';
    @Input() formControlName: string = '';
    @Input() isDisabled: boolean = false;
    @Input() autocompleteFlag: boolean = false;

    private ngControl: any;
    hasPasswordToggler = false;
    showPassword = false;
    value: string = '';

    constructor(private injector: Injector) {}

    ngOnInit() {
        setTimeout(() => (this.ngControl = this.injector.get(NgControl, null)));
        if (this.inputType === 'password') {
            this.hasPasswordToggler = true;
            this.showPassword = false;
        }
    }

    passwordToggler() {
        this.showPassword = !this.showPassword;
        this.inputType = !this.showPassword ? 'password' : 'text';
    }

    shouldShowErrors() {
        const showErrors =
            this.ngControl &&
            this.ngControl.invalid &&
            (this.ngControl.dirty || this.ngControl.touched);

        return showErrors;
    }

    listOfErrors(): string[] {
        if (!this.ngControl.errors) return [];
        // return Object.keys(this.ngControl.errors);
        return Object.keys(this.ngControl.errors).map((key) => {
            switch (key) {
                case 'required':
                    return 'This field is required.';
                case 'email':
                    return 'Please enter a valid email address.';
                case 'minlength':
                    return `Please type a password with ${this.ngControl.errors[key].requiredLength} minimum characters.`;
                case 'pattern':
                    if (this.inputType === 'password') {
                        return `Please type a password with at least a number, a special character, a lowercase and an uppercase.`;
                    } else {
                        return 'pattern';
                    }
                case 'passwordsDontMatch':
                    return `Passwords don't match.`;
                default:
                    console.log(key);
                    return 'Invalid field';
            }
        });
    }

    onChange: any = () => {};
    onTouched: any = () => {};

    writeValue(value: string) {
        this.value = value;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
}
