import { Injectable } from '@angular/core';
import {
    ITodoDetail,
    ITodoLists,
} from '../../features/todo/interfaces/todo-details.interface';
import { BehaviorSubject } from 'rxjs';
import { SetTodoListDto } from '../../features/todo/dtos/todo-details.dto';

@Injectable()
export class TodoService {
    private todoList!: ITodoLists;
    private todoSubject = new BehaviorSubject<ITodoLists>(this.todoList);

    constructor() {
        this.todoList = {
            trashList: [],
            todoList: [],
        };
    }

    getTodoListsObservable() {
        return this.todoSubject.asObservable();
    }

    async setTodoList(todoListToSet: SetTodoListDto): Promise<boolean> {
        this.todoList = {
            ...this.todoList,
            ...todoListToSet,
        };

        console.log({
            todoList: this.todoList,
        });

        this.todoSubject.next(this.todoList);
        return Promise.resolve(true);
    }

    async handleTodoTrash(todo: ITodoDetail): Promise<boolean> {
        if (!todo.isInTrash) {
            const todoIndexToUpdate = this.todoList.todoList.findIndex(
                (el) => todo.id === el.id,
            );

            if (todoIndexToUpdate !== -1) {
                this.todoList.todoList.splice(todoIndexToUpdate, 1);
                this.todoList.trashList.push({
                    ...todo,
                    isInTrash: true,
                });

                this.todoSubject.next(this.todoList);
            }
        } else {
            const todoIndexToUpdate = this.todoList.trashList.findIndex(
                (el) => todo.id === el.id,
            );

            if (todoIndexToUpdate !== -1) {
                this.todoList.trashList.splice(todoIndexToUpdate, 1);
                this.todoList.todoList.push({
                    ...todo,
                    isInTrash: false,
                });
                this.todoSubject.next(this.todoList);
            }
        }

        return Promise.resolve(true);
    }

    async getTodosFromLocalStorage(): Promise<ITodoDetail[]> {
        const savedData = window.localStorage.getItem('todo-list');
        const savedTrashData = window.localStorage.getItem('todo-trash-list');

        if (savedData) {
            this.todoList.todoList = JSON.parse(savedData);
        }

        if (savedTrashData) {
            this.todoList.trashList = JSON.parse(savedTrashData);
        }

        this.todoSubject.next(this.todoList);
        return Promise.resolve(this.todoList.todoList);
    }

    async getTodos(): Promise<ITodoDetail[]> {
        this.todoSubject.next(this.todoList);
        return Promise.resolve(this.todoList.todoList);
    }

    async getAllTodosList(): Promise<ITodoLists> {
        return Promise.resolve(this.todoList);
    }

    async getTodo(id: number): Promise<ITodoDetail | undefined> {
        return Promise.resolve(
            this.todoList.todoList.find((el) => el.id === id),
        );
    }

    async updateTodoList(todoToUpdate: ITodoDetail): Promise<ITodoDetail[]> {
        const todoIndexToFind = this.todoList.todoList.findIndex(
            (el) => el.id === todoToUpdate.id,
        );
        if (todoIndexToFind !== -1) {
            this.todoList.todoList[todoIndexToFind] = todoToUpdate;
            this.todoSubject.next(this.todoList);
        }

        return Promise.resolve(this.todoList.todoList);
    }

    async addTodo(newTodo: ITodoDetail): Promise<void> {
        this.todoList.todoList.push(newTodo);
        this.todoSubject.next(this.todoList);
        return Promise.resolve();
    }
}
