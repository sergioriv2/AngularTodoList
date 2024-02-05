import {
    Component,
    Injector,
    Input,
    Optional,
    Self,
    forwardRef,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
    NgControl,
} from '@angular/forms';

@Component({
    selector: 'form-field',
    templateUrl: 'form-field.component.html',
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

    value: string = '';
    private ngControl: any;

    constructor(private injector: Injector) {}

    ngOnInit() {
        // Retrasa la inyección de NgControl para evitar la dependencia circular
        setTimeout(() => (this.ngControl = this.injector.get(NgControl, null)));
    }

    shouldShowErrors() {
        console.log({
            shouldShowErrors:
                this.ngControl &&
                this.ngControl.invalid &&
                (this.ngControl.dirty || this.ngControl.touched),
        });

        return (
            this.ngControl &&
            this.ngControl.invalid &&
            (this.ngControl.dirty || this.ngControl.touched)
        );
    }

    listOfErrors(): string[] {
        if (!this.ngControl.errors) return [];

        return Object.keys(this.ngControl.errors).map((key) => {
            switch (key) {
                case 'required':
                    return 'This field is required';
                case 'email':
                    return 'Please enter a valid email address';
                case 'minlength':
                    return 'Please enter a valid email address';
                // Agrega más casos según tus validaciones
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
