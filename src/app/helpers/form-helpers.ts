import { FormGroup, ValidationErrors } from '@angular/forms';

export interface AllValidationErrors {
    control_name: string;
    error_value: ErrorValue;
}

export interface ErrorValue {
    [x: string]: any;
}

export const isStringArray = (value: any): boolean => {
    if (value instanceof Array) {
        for (const item of value) {
            if (typeof item !== 'string') {
                return false;
            }
        }
        return true;
    }
    return false;
};

export const getValidationErrorsFromForm = (form: FormGroup) => {
    const errorList: AllValidationErrors[] = [];
    Object.keys(form.controls).forEach((key) => {
        // Get errors of every form control
        if (form.get(key)) {
            errorList.push({
                control_name: key,
                error_value: form.get(key)?.errors as ValidationErrors,
            });
        }
    });

    return errorList;
};
