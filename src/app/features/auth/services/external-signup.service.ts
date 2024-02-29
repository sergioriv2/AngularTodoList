import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
import { BehaviorSubject } from 'rxjs';

interface Window {
    google: any;
}

declare var window: Window;

@Injectable()
export class ExternalSignupService {
    private realAuthState = new BehaviorSubject<SocialUser | null>(null);
    realAuthSubscription = this.realAuthState.asObservable();

    constructor(
        private readonly socialAuthService: SocialAuthService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        // this.socialAuthService.authState

        this.socialAuthService.authState.subscribe((socialUser) => {
            this.realAuthState.next(socialUser);
        });

        this.realAuthSubscription.subscribe((socialUser) => {
            if (socialUser) {
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
            }
        });
    }

    initGoogleConfiguration() {
        window.google.accounts.id.initialize({
            client_id:
                '808733031898-ku5qok1ru2kk0uvhej3e14of2ih2gqka.apps.googleusercontent.com',
            callback: ({ credential }: { credential: any }) => {
                const socialUser = this.createSocialUser(credential);
                socialUser.provider = ExternalSignupOptionEnum.Google;
                this.realAuthState.next(socialUser);
            },
            auto_select: false,
        });

        window.google.accounts.id.disableAutoSelect();
        window.google.accounts.id.renderButton(
            document.getElementById('g_id_onload'),
            {
                theme: 'outline',
                size: 'medium',
                locale: 'en-US',
                text: 'continue_with',
                width: '330',
                shape: 'rectangular',
                type: 'standard',
                logo_alignment: 'center',
                auto_select: false,
            }, // Ejemplo de opciones, ajusta según necesites
        );
    }

    private createSocialUser(idToken: string) {
        const user = new SocialUser();
        user.idToken = idToken;
        const payload = this.decodeJwt(idToken);
        user.id = payload.sub;
        user.name = payload.name;
        user.email = payload.email;
        user.photoUrl = payload.picture;
        user.firstName = payload['given_name'];
        user.lastName = payload['family_name'];
        return user;
    }

    private decodeJwt(idToken: string) {
        const base64Url = idToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c: string) {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join(''),
        );
        return JSON.parse(jsonPayload);
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
