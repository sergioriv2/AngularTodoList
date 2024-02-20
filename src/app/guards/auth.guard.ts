import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { tap } from 'rxjs';
import { AppCompleteRoutesEnum } from '../shared/routes/app-routes.enum';

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.accessTokenValidation().pipe(
        tap((isAuthenticated) => {
            if (!isAuthenticated)
                router.navigateByUrl(AppCompleteRoutesEnum.AuthRoot);
        }),
    );
};

export const PublicAuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.accessTokenValidation().pipe(
        tap((isAuthenticated) => {
            if (!isAuthenticated)
                router.navigateByUrl(AppCompleteRoutesEnum.AuthRoot);
        }),
    );
};
