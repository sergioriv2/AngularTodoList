import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormService {
    private shouldShowErrorsSource = new BehaviorSubject<boolean>(false);
    currenShouldShowErrorsState = this.shouldShowErrorsSource.asObservable();

    constructor() {}

    updateShouldShowErrors(state: boolean) {
        this.shouldShowErrorsSource.next(state);
    }
}
