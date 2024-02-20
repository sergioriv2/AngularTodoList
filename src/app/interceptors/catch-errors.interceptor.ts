import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { APILoginResponse } from '../features/auth/models/auth-responses.interface';

@Injectable()
export class APICatchErrorsInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const defaultResponse: APILoginResponse = {
            statusCode: 500,
            message: 'Internal Server Error',
            errors: [],
        };

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log({
                    error: error.error,
                });
                if (error.error instanceof ProgressEvent) {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(
                        `Backend returned code ${error.status}, body was: ${error.error}`,
                    );
                    return throwError(() => error.error);
                } else if (error.error instanceof Object) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                    return throwError(() => error.error);
                } else {
                    return throwError(() => defaultResponse);
                }
            }),
        );
    }
}
