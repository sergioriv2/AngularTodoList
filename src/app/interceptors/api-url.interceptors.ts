import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageItemsEnum } from '../common/enums/local-storage.enum';
import { environment } from '../../environments/environment';

@Injectable()
export class APIUrlInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            url: `${environment.apiUrl}${req.url}`,
        });

        return next.handle(clonedRequest);
    }
}
