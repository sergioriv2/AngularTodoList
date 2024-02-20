import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable()
export class RoutesService {
    private previousUrl: string = '';
    constructor(private readonly router: Router) {
        this.router.events
            .pipe(
                filter(
                    (event): event is NavigationEnd =>
                        event instanceof NavigationEnd,
                ),
            )
            .subscribe((event: NavigationEnd) => {
                this.previousUrl = event.url;
            });
    }

    getPreviousUrl() {
        return this.previousUrl;
    }
}
