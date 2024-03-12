import { Component, HostListener } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
    IAppTodoLists,
    ITodoLists,
} from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';
import { LocalStorageItemsEnum } from '../../../../common/enums/local-storage.enum';
import { Router } from '@angular/router';
import { AppCompleteRoutesEnum } from '../../../../shared/routes/app-routes.enum';
import dayjs from 'dayjs';

@Component({
    selector: 'todo-container',
    templateUrl: './todo-view.component.html',
    styleUrl: './todo-view.component.css',
})
export class TodoViewComponent {
    todoList!: ITodoLists;
    todoListTypes = TodoListTypes;
    appTodoLists!: IAppTodoLists;

    appTodoListsKeys!: string[];

    private todoListsSubscription: Subscription;

    constructor(
        private readonly router: Router,
        private readonly todoService: TodoService,
    ) {
        this.todoList = {
            todoList: [],
            trashList: [],
        };

        this.appTodoLists = {};

        this.todoListsSubscription = this.todoService.todoList$.subscribe(
            (items) => {
                if (items) {
                    this.todoList.todoList = items?.todoList;
                    this.todoList.trashList = items?.trashList;

                    const todoLists = items?.todoList;

                    const differentListsDates = [
                        ...new Set(
                            todoLists.map((el) =>
                                dayjs(el.createdAt).format('MM-DD-YYYY'),
                            ),
                        ),
                    ];

                    differentListsDates
                        .sort((a, b) => {
                            const firstDateSplit = a.split('-');
                            const secondDateSplit = b.split('-');

                            const aa = `${firstDateSplit[2]}${firstDateSplit[0]}${firstDateSplit[1]}`;
                            const bb = `${secondDateSplit[2]}${secondDateSplit[0]}${secondDateSplit[1]}`;

                            return aa < bb ? -1 : aa > bb ? 1 : 0;
                        })
                        .forEach((el) => {
                            this.appTodoLists[`${el}`] = todoLists.filter(
                                (filterEl) =>
                                    dayjs(filterEl.createdAt).format(
                                        'MM-DD-YYYY',
                                    ) === el,
                            );
                        });

                    this.appTodoListsKeys = Object.keys(this.appTodoLists);
                }
            },
        );
    }

    @HostListener('window:beforeunload')
    unloadNotification() {
        window.localStorage.setItem(
            'todo-list',
            JSON.stringify(this.todoList.todoList),
        );
        window.localStorage.setItem(
            'todo-trash-list',
            JSON.stringify(this.todoList.trashList),
        );
    }

    async ngOnInit() {
        const todoLists = await this.todoService.getTodosFromLocalStorage();

        this.todoList.todoList = todoLists;
    }

    ngOnDestroy() {
        this.todoListsSubscription.unsubscribe();
    }

    // get description() {
    //     return this.todosAddForm.get('description');
    // }
}
