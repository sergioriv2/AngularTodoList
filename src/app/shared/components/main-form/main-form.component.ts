import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { FormService } from '../../services/form.service';

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

    captchaSiteKey = environment.recaptcha.siteKey;

    constructor(
        private readonly recaptchaV3Service: ReCaptchaV3Service,
        private readonly formService: FormService,
    ) {
        this.onSubmitProp = this.onSubmit.bind(this);
    }

    async onSubmit(): Promise<any> {
        // Validate captcha
        this.recaptchaV3Service.execute('action').subscribe((captchaToken) => {
            this.formService.validateCaptchaTokenV3(captchaToken).subscribe({
                next: async () => {
                    await this.onSubmitProp();
                },
                error: (error) => {
                    console.log({
                        captchaError: error,
                    });
                },
            });
        });
    }
}
