import { Injectable } from '@angular/core';
import {
    IAppTodoLists,
    ITodoDetail,
    ITodoLists,
} from '../interfaces/todo-details.interface';
import { BehaviorSubject } from 'rxjs';
import { SetTodoListDto } from '../dtos/todo-details.dto';
import { TodoColors } from '../../../common/enums/todo-colors.enum';
import { LocalStorageItemsEnum } from '../../../common/enums/local-storage.enum';
import dayjs from 'dayjs';

@Injectable()
export class TodoService {
    private appLists!: IAppTodoLists;
    private todoSubject = new BehaviorSubject<IAppTodoLists>(this.appLists);
    public todoList$ = this.todoSubject.asObservable();

    constructor() {
        const today = dayjs(new Date()).format('MM-DD-YYYY');

        this.appLists = {
            [today]: [],
        };
    }

    getTodoListsObservable() {
        return this.todoSubject.asObservable();
    }

    generateRandomColor() {
        const todoColorsArray = Object.values(TodoColors);

        return todoColorsArray[
            Math.floor(Math.random() * todoColorsArray.length)
        ].toString();
    }

    async setTodoList(todoListToSet: IAppTodoLists): Promise<boolean> {
        this.appLists = todoListToSet;

        this.todoSubject.next(this.appLists);
        return Promise.resolve(true);
    }

    // async handleTodoTrash(todo: ITodoDetail): Promise<boolean> {
    //     if (!todo.isInTrash) {
    //         const todoIndexToUpdate = this.todoList.todoList.findIndex(
    //             (el) => todo.id === el.id,
    //         );

    //         if (todoIndexToUpdate !== -1) {
    //             this.todoList.todoList.splice(todoIndexToUpdate, 1);
    //             this.todoList.trashList.push({
    //                 ...todo,
    //                 isInTrash: true,
    //             });

    //             this.todoSubject.next(this.todoList);
    //         }
    //     } else {
    //         const todoIndexToUpdate = this.todoList.trashList.findIndex(
    //             (el) => todo.id === el.id,
    //         );

    //         if (todoIndexToUpdate !== -1) {
    //             this.todoList.trashList.splice(todoIndexToUpdate, 1);
    //             this.todoList.todoList.push({
    //                 ...todo,
    //                 isInTrash: false,
    //             });
    //             this.todoSubject.next(this.todoList);
    //         }
    //     }

    //     return Promise.resolve(true);
    // }

    async getTodosFromLocalStorage(): Promise<IAppTodoLists> {
        const savedAppLists = window.localStorage.getItem(
            LocalStorageItemsEnum.APP_LISTS,
        );

        if (savedAppLists) this.appLists = JSON.parse(savedAppLists);

        return Promise.resolve(this.appLists);
    }

    async getTodos(): Promise<IAppTodoLists> {
        this.todoSubject.next(this.appLists);
        return Promise.resolve(this.appLists);
    }

    // async getAllTodosList(): Promise<IAppTodoLists> {
    //     return Promise.resolve(this.appLists);
    // }

    // async getTodo(id: number): Promise<ITodoDetail | undefined> {
    //     return Promise.resolve(
    //         this.todoList.todoList.find((el) => el.id === id),
    //     );
    // }

    async updateTodoList(todoToUpdate: ITodoDetail): Promise<IAppTodoLists> {
        const itemDate = dayjs(todoToUpdate.createdAt).format('MM-DD-YYYY');
        const itemList = this.appLists[itemDate];

        const todoIndexToFind = itemList.findIndex(
            (el) => el.id === todoToUpdate.id,
        );

        if (todoIndexToFind !== -1) {
            itemList[todoIndexToFind] = todoToUpdate;
            this.todoSubject.next(this.appLists);
        }

        return Promise.resolve(this.appLists);
    }

    async addTodo(newTodo: ITodoDetail): Promise<void> {
        const itemDate = dayjs(newTodo.createdAt).format('MM-DD-YYYY');
        const itemList = this.appLists[itemDate];

        if (itemList) {
            itemList.push(newTodo);
        } else {
            this.appLists[itemDate] = [newTodo];
        }

        this.todoSubject.next(this.appLists);
        return Promise.resolve();
    }
}
