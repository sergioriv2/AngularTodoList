import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageItemsEnum } from '../common/enums/local-storage.enum';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem(
            LocalStorageItemsEnum.ACCESS_TOKEN,
        );

        if (accessToken) {
            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
