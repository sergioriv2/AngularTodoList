import {
    MicrosoftLoginProvider,
    SocialAuthService,
} from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ExternalSignupOptionEnum } from './external-signup.enum';
import { ExternalSignupService } from '../../services/external-signup.service';
import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: './external-signup-option.component.html',
    styleUrl: './external-signup-option.component.css',
    selector: 'external-signin',
})
export class ExternalSignupOptionComponent implements AfterViewInit {
    @Input() signinType!: string;
    externalSignupOptionEnum = ExternalSignupOptionEnum;

    constructor(
        private readonly socialAuthService: SocialAuthService,
        private readonly externalSignupService: ExternalSignupService,
    ) {}

    ngAfterViewInit(): void {
        if (this.signinType === ExternalSignupOptionEnum.Google) {
            this.externalSignupService.initGoogleConfiguration();
        }
    }

    // handleGoogleLogin() {
    //     const tokenClient = window.google.accounts.oauth2
    //         .initTokenClient({
    //             scope: 'https://www.googleapis.com/auth/userinfo.email',
    //             client_id:
    //                 '808733031898-ku5qok1ru2kk0uvhej3e14of2ih2gqka.apps.googleusercontent.com',
    //             callback: (tokenResponse: any) => {
    //                 if (tokenResponse.error) {
    //                     console.log({
    //                         error: tokenResponse.error,
    //                     });
    //                 } else {
    //                     const accesstoken = tokenResponse.access_token;
    //                     // Procede a obtener el correo electrónico del usuario
    //                     const fetchUserInfo = (accessToken: string) => {
    //                         fetch(
    //                             'https://www.googleapis.com/oauth2/v2/userinfo',
    //                             {
    //                                 headers: {
    //                                     Authorization: `Bearer ${accessToken}`,
    //                                 },
    //                             },
    //                         )
    //                             .then((response) => response.json())
    //                             .then((data) => {
    //                                 console.log('User info:', data);
    //                                 // Aquí puedes acceder al correo electrónico como data.email
    //                                 if (data.email) {
    //                                     console.log('User email:', data.email);
    //                                 }
    //                             })
    //                             .catch((error) => {
    //                                 console.error(
    //                                     'Error fetching user info:',
    //                                     error,
    //                                 );
    //                             });

    //                         fetchUserInfo(accessToken);
    //                     };

    //                     fetchUserInfo(accesstoken);
    //                 }
    //             },
    //         })
    //         .requestAccessToken();

    //     console.log({
    //         tokenClient,
    //     });
    // }

    handleMicrosoftLogin() {
        this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
    }
}
