import {
    GoogleLoginProvider,
    MicrosoftLoginProvider,
    SocialAuthService,
    SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ExternalSignupOptionEnum } from './external-signup.enum';
import { FormService } from '../../../../shared/services/form.service';
import { AuthService } from '../../services/auth.service';
import { ValidateGoogleTokenDto } from '../../dtos/validate-token.dto';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import { Subscription } from 'rxjs';
// import { ExternalSignupOptionEnum } from './external-signup.enum';

@Component({
    templateUrl: './external-signup-option.component.html',
    selector: 'external-signin',
})
export class ExternalSignupOptionComponent implements OnDestroy {
    @Input() signinType!: string;

    private authStateSubscription: Subscription;
    user!: SocialUser;
    externalSignupOptionEnum = ExternalSignupOptionEnum;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly socialAuthService: SocialAuthService,
    ) {
        this.authStateSubscription = this.socialAuthService.authState.subscribe(
            (user) => {
                this.user = user;
                console.log({
                    user: this.user,
                    signIn: this.signinType,
                });

                switch (this.signinType) {
                    case ExternalSignupOptionEnum.Google:
                        this.validateGoogleToken();
                        break;
                    default:
                        break;
                }
            },
        );
    }

    ngOnDestroy(): void {
        this.authStateSubscription.unsubscribe();
    }

    private validateGoogleToken() {
        const validateTokenPayload: ValidateGoogleTokenDto = {
            token: this.user.idToken,
        };

        this.authService.validateGoogleToken(validateTokenPayload).subscribe({
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

                    this.router.navigateByUrl(AppCompleteRoutesEnum.AppRoot);
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    handleMicrosoftLogin() {
        this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
    }
}
