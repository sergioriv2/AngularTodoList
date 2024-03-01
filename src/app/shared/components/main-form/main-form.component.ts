import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.css',
})
export class MainFormComponent {
    @Input() formGroup!: FormGroup;
    @Input() onSubmitProp!: any;

    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() isLoading?: boolean;
    @Input() submitButtonText!: string;

    constructor(private readonly formBuilder: FormBuilder) {}

    async onSubmit(): Promise<any> {
        await this.onSubmitProp();
    }
}
