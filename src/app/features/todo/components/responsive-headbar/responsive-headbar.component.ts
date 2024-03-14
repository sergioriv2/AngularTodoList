import { Component } from '@angular/core';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import { ISidebarOptions } from '../../interfaces/sidebar-options.interface';
import { SidebarOptionsEnum } from '../../../../common/enums/sidebar-options.enum';

@Component({
    selector: 'responsive-headbar',
    templateUrl: './responsive-headbar.component.html',
    styleUrl: './responsive-headbar.component.css',
})
export class ResponsiveHeadbar {
    headbarOptions: ISidebarOptions[][];

    constructor(private readonly router: Router) {
        // Init
        this.headbarOptions = [];
        this.initHeadbarOptions();
    }

    initHeadbarOptions(): void {
        this.headbarOptions = [
            [
                {
                    name: SidebarOptionsEnum.All,
                    isActive: true,
                    linkTo: '/app/todo-lists',
                    faClass: 'fas fa-calendar',
                },
                // {
                //     name: SidebarOptionsEnum.Today,
                //     isActive: false,
                //     linkTo: '/app/todo-lists',
                //     faClass: 'far fa-calendar',
                // },
            ],
            [
                {
                    name: SidebarOptionsEnum.Completed,
                    isActive: false,
                    linkTo: '/app/todo-lists/completed',
                    faClass: 'fas fa-check-circle',
                },
                {
                    name: SidebarOptionsEnum.Trash,
                    isActive: false,
                    linkTo: '/app/todo-lists/trash',
                    faClass: 'fas fa-trash',
                },
            ],
        ];
    }
}
