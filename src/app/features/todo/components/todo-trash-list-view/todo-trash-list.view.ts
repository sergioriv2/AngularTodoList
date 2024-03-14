import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppTodoLists } from '../../interfaces/todo-details.interface';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todo-trash-list-view',
    templateUrl: './todo-trash-list.view.html',
    styleUrls: [
        '../todo-view/todo-view.component.css',
        './todo-trash-list.view.css',
    ],
})
export class TodoTrashListView implements OnInit, OnDestroy {
    trashLists: IAppTodoLists | null;
    appTrashListsKeys: string[];

    private listSubscription: Subscription;

    constructor(private readonly todoService: TodoService) {
        this.trashLists = {};
        this.appTrashListsKeys = [];

        this.listSubscription = this.todoService.todoList$.subscribe(
            (value) => {
                if (value) this.setAndFilterCompletedLists(value);
            },
        );
    }

    private setAndFilterCompletedLists(lists: IAppTodoLists) {
        const listDates = Object.keys(lists);

        for (let date of listDates) {
            if (this.trashLists) {
                const filterResult = lists[date].filter((el) => el.isInTrash);

                if (filterResult.length !== 0) {
                    this.trashLists[date] = filterResult;
                }
            }
        }

        if (this.trashLists) {
            this.appTrashListsKeys = Object.keys(this.trashLists);
        }
    }

    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
    }

    async ngOnInit() {
        const list = await this.todoService.getTodosFromLocalStorage();
        this.setAndFilterCompletedLists(list);
    }
}
