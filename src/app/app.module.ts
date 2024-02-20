import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TodoModule } from './features/todo/todo.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIUrlInterceptorService } from './interceptors/api-url.interceptors';
import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { RoutesService } from './shared/services/routes.service';
import { APICatchErrorsInterceptorService } from './interceptors/catch-errors.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        SharedModule,

        // Features
        // LoginModule,
        // AuthModule,
        TodoModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        RoutesService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIUrlInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APICatchErrorsInterceptorService,
            multi: true,
        },
        provideAnimationsAsync(),
    ],
})
export class AppModule {}
