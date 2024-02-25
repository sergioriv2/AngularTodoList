import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
    shouldShowComponent: boolean = true;

    constructor(
        private readonly authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.authService.accessTokenValidation().subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.router.navigateByUrl(AppCompleteRoutesEnum.TodoList);
                this.shouldShowComponent = false;
            } else {
                this.shouldShowComponent = true;
            }
        });
    }
}
