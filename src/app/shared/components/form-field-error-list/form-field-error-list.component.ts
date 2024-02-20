import { Component, Input, OnInit } from '@angular/core';
import { AllValidationErrors, ErrorValue } from '../../../helpers/form-helpers';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'form-field-error-list',
    templateUrl: './form-field-error-list.component.html',
    styleUrl: './form-field-error-list.component.css',
})
export class FormFieldErrorList implements OnInit {
    // @Input() errors: AllValidationErrors[];
    @Input() errors: string[];
    shouldShowErrors: boolean;

    constructor(private readonly formService: FormService) {
        this.errors = [];
        this.shouldShowErrors = false;
    }

    ngOnInit(): void {
        this.formService.currenShouldShowErrorsState.subscribe((state) => {
            this.shouldShowErrors = state;
        });
    }

    listOfErrors(): string[] {
        if (!this.errors) return [];

        return this.errors;
    }
}
