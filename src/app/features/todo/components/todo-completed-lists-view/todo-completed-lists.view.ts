import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppTodoLists } from '../../interfaces/todo-details.interface';
import { Subscription, catchError, filter } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todo-completed-lists-view',
    templateUrl: './todo-completed-lists.view.html',
    styleUrls: [
        '../todo-view/todo-view.component.css',
        './todo-completed-lists.view.css',
    ],
})
export class TodoCompletedListsView implements OnDestroy, OnInit {
    completedLists: IAppTodoLists | null;
    appCompletedListsKeys: string[];

    private listSubscription: Subscription;

    constructor(private readonly todoService: TodoService) {
        this.completedLists = {};
        this.appCompletedListsKeys = [];

        this.listSubscription = this.todoService.todoList$.subscribe(
            (value) => {
                if (value) this.setAndFilterCompletedLists(value);
            },
        );
    }

    private setAndFilterCompletedLists(lists: IAppTodoLists) {
        const listDates = Object.keys(lists);

        for (let date of listDates) {
            if (this.completedLists) {
                const filterResult = lists[date].filter((el) => el.isComplete);

                if (filterResult.length !== 0) {
                    this.completedLists[date] = filterResult;
                }
            }
        }

        if (this.completedLists) {
            this.appCompletedListsKeys = Object.keys(this.completedLists);
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
