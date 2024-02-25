import { Injectable } from '@angular/core';
import { SignupDto } from '../dtos/signup.dto';
import {
    APILoginResponse,
    APISignupResponse,
    APIVerifyJWTResponse,
    LoginResponse,
} from '../models/auth-responses.interface';
import { SignInDto } from '../dtos/signin.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { LocalStorageItemsEnum } from '../../../common/enums/local-storage.enum';
import { HttpClient } from '@angular/common/http';
import { ActivateEmailAccountDto } from '../dtos/activate-account.dto';
import { ValidateGoogleTokenDto } from '../dtos/validate-token.dto';

@Injectable()
export class AuthService {
    constructor(private readonly httpClient: HttpClient) {}

    accessTokenValidation(): Observable<boolean> {
        const accessToken = localStorage.getItem(
            LocalStorageItemsEnum.ACCESS_TOKEN,
        );

        if (!accessToken) {
            return of(false);
        }

        return this.httpClient
            .get<APIVerifyJWTResponse>('auth/validate-jwt')
            .pipe(
                map((el) => !!el.payload?.ok),
                catchError(() => of(false)),
            );
    }

    signupUser(payload: SignupDto): Observable<APISignupResponse> {
        return this.httpClient.post<APISignupResponse>('auth/sign-up', payload);
    }

    activateEmailAccount(
        payload: ActivateEmailAccountDto,
    ): Observable<APILoginResponse> {
        return this.httpClient.post<APILoginResponse>(
            'auth/activate-email',
            payload,
        );
    }

    validateGoogleToken(
        payload: ValidateGoogleTokenDto,
    ): Observable<APILoginResponse> {
        return this.httpClient.post<APILoginResponse>(
            'auth/validate-jwt/google',
            payload,
        );
    }

    logInUser(payload: SignInDto): Observable<APILoginResponse> {
        return this.httpClient.post<APILoginResponse>('auth/log-in', payload);
    }
}
