import {
    MicrosoftLoginProvider,
    SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';
import { ExternalSignupOptionEnum } from './external-signup.enum';
import { ExternalSignupService } from '../../services/external-signup.service';

@Component({
    templateUrl: './external-signup-option.component.html',
    styleUrl: './external-signup-option.component.css',
    selector: 'external-signin',
})
export class ExternalSignupOptionComponent {
    @Input() signinType!: string;
    externalSignupOptionEnum = ExternalSignupOptionEnum;

    constructor(
        private readonly socialAuthService: SocialAuthService,
        private readonly externalSignupService: ExternalSignupService,
    ) {}

    handleMicrosoftLogin() {
        this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
    }
}
