import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAccountActivationForm } from '../../interfaces/activation-form.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivateEmailAccountDto } from '../../dtos/activate-account.dto';
import { error } from 'console';
import { FormService } from '../../../../shared/services/form.service';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import { SessionStorageItemsEnum } from '../../../../common/enums/session-storage.enum';

@Component({
    selector: 'account-activation-form',
    templateUrl: './account-activation-form.component.html',
})
export class AccountActivationForm implements OnInit, OnDestroy {
    form!: FormGroup;
    formData: IAccountActivationForm;
    private formValuesSubscription?: Subscription;
    activateAccountErrorList: string[] = [];
    emailAccountActivation?: string = '';

    constructor(
        private readonly router: Router,
        private readonly formservice: FormService,
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
    ) {
        this.formData = {
            code: '',
        };
    }
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            code: [this.formData.code, [Validators.required]],
        });

        this.formValuesSubscription = this.form.valueChanges.subscribe(
            (values) => {
                this.formData = values;
            },
        );

        if (
            !sessionStorage.getItem(
                SessionStorageItemsEnum.EmailAccountActivation,
            )
        ) {
            this.router.navigateByUrl(AppCompleteRoutesEnum.AuthRoot);
        } else {
            this.emailAccountActivation = sessionStorage.getItem(
                SessionStorageItemsEnum.EmailAccountActivation,
            ) as string;
        }
    }

    onSubmit() {
        const activateEmailAccountPayload: ActivateEmailAccountDto = {
            ...this.formData,
            email: this.emailAccountActivation as string,
        };

        this.authService
            .activateEmailAccount(activateEmailAccountPayload)
            .subscribe({
                next: (response) => {
                    if (response.payload && response.statusCode === 200) {
                        localStorage.setItem(
                            LocalStorageItemsEnum.ACCESS_TOKEN,
                            response.payload.accessToken,
                        );
                        localStorage.setItem(
                            LocalStorageItemsEnum.REFRESH_TOKEN,
                            response.payload.refreshToken,
                        );

                        sessionStorage.removeItem(
                            SessionStorageItemsEnum.EmailAccountActivation,
                        );

                        this.router.navigateByUrl(
                            AppCompleteRoutesEnum.AppRoot,
                        );
                    }
                },
                error: (error) => {
                    this.activateAccountErrorList =
                        this.formservice.handleAPIFormErrors(error);
                },
            });
    }

    ngOnDestroy(): void {
        this.formValuesSubscription?.unsubscribe();
    }
}
