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
        const mapErrors: string[] = [];
        // this.errors.forEach((el) => {
        //     if (el.error_value) {
        //         Object.keys(el.error_value).forEach((errorKey) => {
        //             // console.log({
        //             //     error_field: el.control_name,
        //             //     errorValue: el.error_value[errorKey],
        //             //     errorKey: errorKey,
        //             // });
        //             let error_message: string;

        //             switch (errorKey) {
        //                 case 'required':
        //                     error_message = `'${el.control_name}' field is required.`;
        //                     break;
        //                 case 'email':
        //                     error_message =
        //                         'Please enter a valid email address.';
        //                     break;
        //                 case 'minlength':
        //                     error_message = `'${el.control_name}' should have a minimum of ${el.error_value[errorKey].requiredLength} characters`;
        //                     break;
        //                 default:
        //                     error_message = `Unhandled validation. Error Field: ${el.control_name}. Error Value: ${el.error_value[errorKey]}. Error Key: ${errorKey}`;
        //                     break;
        //             }

        //             mapErrors.push(error_message);
        //         });
        //     }

        //     return mapErrors;
        // });

        return this.errors;
    }
}
