import { Component } from '@angular/core';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';

@Component({
    selector: 'responsive-sidebar',
    templateUrl: './responsive-sidebar.component.html',
    styleUrl: './responsive-sidebar.component.css',
})
export class ResponsiveSidebar {
    userName!: string;

    constructor(private readonly router: Router) {
        this.userName = 'Placeholder';
    }

    signOut() {
        localStorage.removeItem(LocalStorageItemsEnum.ACCESS_TOKEN);
        localStorage.removeItem(LocalStorageItemsEnum.REFRESH_TOKEN);
        this.router.navigateByUrl(AppCompleteRoutesEnum.AuthRoot);
    }
}
