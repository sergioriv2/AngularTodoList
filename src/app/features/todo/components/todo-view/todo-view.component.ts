import { Component, HostListener } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
    IAppTodoLists,
    ITodoLists,
} from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { ITodoDetail } from '../../interfaces/todo-details.interface';

@Component({
    selector: 'todo-container',
    templateUrl: './todo-view.component.html',
    styleUrl: './todo-view.component.css',
})
export class TodoViewComponent {
    appTodoLists: IAppTodoLists;
    appTodoListsKeys: string[];

    private todoListsSubscription: Subscription;

    constructor(private readonly todoService: TodoService) {
        // Init variables
        this.appTodoLists = {};
        this.appTodoListsKeys = [];

        this.todoListsSubscription = this.todoService.todoList$.subscribe(
            (items) => {
                if (items) {
                    Object.values(items).forEach((todoLists) => {
                        const differentListsDates = [
                            ...new Set(
                                todoLists.map((el: ITodoDetail) =>
                                    dayjs(el.createdAt).format('MM-DD-YYYY'),
                                ),
                            ),
                        ];

                        differentListsDates
                            .sort((a: string, b: string) => {
                                const firstDateSplit = a.split('-');
                                const secondDateSplit = b.split('-');

                                const aa = `${firstDateSplit[2]}${firstDateSplit[0]}${firstDateSplit[1]}`;
                                const bb = `${secondDateSplit[2]}${secondDateSplit[0]}${secondDateSplit[1]}`;

                                return aa < bb ? -1 : aa > bb ? 1 : 0;
                            })
                            .forEach((el) => {
                                this.appTodoLists[`${el}`] = todoLists.filter(
                                    (filterEl: ITodoDetail) =>
                                        dayjs(filterEl.createdAt).format(
                                            'MM-DD-YYYY',
                                        ) === el,
                                );
                            });

                        this.appTodoListsKeys = Object.keys(this.appTodoLists);
                    });
                }
            },
        );
    }

    @HostListener('window:beforeunload')
    unloadNotification() {
        window.localStorage.setItem(
            LocalStorageItemsEnum.APP_LISTS,
            JSON.stringify(this.appTodoLists),
        );
    }

    async ngOnInit() {
        this.appTodoLists = await this.todoService.getTodosFromLocalStorage();
        this.todoService.setTodoList(this.appTodoLists);
        this.appTodoListsKeys = Object.keys(this.appTodoLists);
    }

    ngOnDestroy() {
        this.todoListsSubscription.unsubscribe();
    }
}
