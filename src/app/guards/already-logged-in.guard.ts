import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { RoutesService } from '../shared/services/routes.service';
import { AppCompleteRoutesEnum } from '../shared/routes/app-routes.enum';

export const AlreadyLoggedInGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const routesService = inject(RoutesService);
    const router = inject(Router);

    authService.accessTokenValidation().subscribe({
        next: (isAuthenticated) => {
            if (isAuthenticated) {
                const previousUrl = routesService.getPreviousUrl();

                if (previousUrl.startsWith('/auth')) {
                    router.navigateByUrl(AppCompleteRoutesEnum.TodoList);
                    return false;
                }

                router.navigateByUrl(previousUrl);
                return false;
            } else {
                return false;
            }
        },
    });

    return true;
};
export const AlreadyLoggedInMatch: CanMatchFn = () => {
    const authService = inject(AuthService);
    const routesService = inject(RoutesService);
    const router = inject(Router);

    authService.accessTokenValidation().subscribe({
        next: (isAuthenticated) => {
            if (isAuthenticated) {
                const previousUrl = routesService.getPreviousUrl();
                console.log({
                    previousUrl,
                });
                if (previousUrl.startsWith('/auth')) {
                    router.navigateByUrl(AppCompleteRoutesEnum.TodoList);
                    return false;
                }

                router.navigateByUrl(previousUrl);
                return false;
            } else {
                return false;
            }
        },
    });

    return true;
};
