import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APILoginResponse } from '../../features/auth/models/auth-responses.interface';
import { isStringArray } from '../../helpers/form-helpers';
import { APIResponseError } from '../models/api-responses.interface';

@Injectable()
export class FormService {
    private shouldShowErrorsSource = new BehaviorSubject<boolean>(false);
    currenShouldShowErrorsState = this.shouldShowErrorsSource.asObservable();

    constructor() {}

    handleAPIFormErrors(error: any): string[] {
        let apiErrors: string[] = [];
        if (error.errors) {
            const err = error as APILoginResponse;
            let errorList = err.errors;
            this.updateShouldShowErrors(true);
            if (isStringArray(errorList)) {
                apiErrors = errorList as string[];
            } else {
                errorList = errorList as APIResponseError[];
                apiErrors = errorList
                    .map((el) => {
                        return Object.values(el.constraints).map(
                            (value) => value,
                        );
                    })
                    .flat();
            }
        } else {
            this.updateShouldShowErrors(true);
            apiErrors.push(
                'An unexpected error ocurred, please try again in a few minutes.',
            );
        }

        return apiErrors;
    }

    updateShouldShowErrors(state: boolean) {
        this.shouldShowErrorsSource.next(state);
    }
}
