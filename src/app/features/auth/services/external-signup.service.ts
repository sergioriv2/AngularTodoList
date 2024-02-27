import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import {
    ValidateGoogleTokenDto,
    ValidateMicrosoftTokenDto,
} from '../dtos/validate-token.dto';
import { AuthService } from './auth.service';
import { LocalStorageItemsEnum } from '../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../shared/routes/app-routes.enum';
import { ExternalSignupOptionEnum } from '../components/external-signup-option/external-signup.enum';

@Injectable()
export class ExternalSignupService {
    constructor(
        private readonly socialAuthService: SocialAuthService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        this.socialAuthService.authState.subscribe((socialUser) => {
            switch (socialUser.provider) {
                case ExternalSignupOptionEnum.Google:
                    this.validateGoogleTokenAPI(socialUser.idToken);
                    break;
                case ExternalSignupOptionEnum.Microsoft:
                    this.validateMicrosoftTokenAPI(socialUser.idToken);
                    break;
                default:
                    console.log({
                        socialUserProvider: socialUser.provider,
                    });
                    break;
            }
        });
    }

    validateGoogleTokenAPI(token: string) {
        const validateTokenPayload: ValidateGoogleTokenDto = {
            token,
        };

        this.authService
            .validateProviderToken(
                validateTokenPayload,
                ExternalSignupOptionEnum.Google,
            )
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

                        this.router.navigateByUrl(
                            AppCompleteRoutesEnum.AppRoot,
                        );
                    }
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }

    validateMicrosoftTokenAPI(token: string) {
        const validateTokenPayload: ValidateMicrosoftTokenDto = {
            token,
        };

        this.authService
            .validateProviderToken(
                validateTokenPayload,
                ExternalSignupOptionEnum.Microsoft,
            )
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

                        this.router.navigateByUrl(
                            AppCompleteRoutesEnum.AppRoot,
                        );
                    }
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }
}
