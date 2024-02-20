import { Injectable } from '@angular/core';
import { SignupDto } from '../dtos/signup.dto';
import { CustomAxiosInstance } from '../../../helpers/axios';
import {
    APILoginResponse,
    APISignupResponse,
    APIVerifyJWTResponse,
    LoginResponse,
} from '../models/auth-responses.interface';
import { Axios, AxiosError } from 'axios';
import { SignInDto } from '../dtos/signin.dto';
import {
    EMPTY,
    Observable,
    catchError,
    from,
    map,
    of,
    tap,
    throwError,
} from 'rxjs';
import { LocalStorageItemsEnum } from '../../../common/enums/local-storage.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

    signupUser(payload: SignupDto): Observable<boolean> {
        return this.httpClient
            .post<APISignupResponse>('auth/sign-up', payload)
            .pipe(
                map((el) => !!el.payload?.emailSent),
                catchError(() => of(false)),
            );
    }

    logInUser(payload: SignInDto): Observable<APILoginResponse> {
        return this.httpClient.post<APILoginResponse>('auth/log-in', payload);
    }
}
