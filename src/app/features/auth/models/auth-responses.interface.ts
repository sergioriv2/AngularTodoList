import { APIResponse } from '../../../shared/models/api-responses.interface';

/* /auth/signup */
export interface SignupResponse {
    emailSent: boolean;
}

/* /auth/log-in */
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

/* /auth/verify-jwt */
export interface VerifyJWTResponse {
    ok: boolean;
}

export type APISignupResponse = APIResponse<SignupResponse>;
export type APILoginResponse = APIResponse<LoginResponse>;
export type APIVerifyJWTResponse = APIResponse<VerifyJWTResponse>;
