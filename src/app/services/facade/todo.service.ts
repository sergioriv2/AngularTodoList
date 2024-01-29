import { Injectable } from '@angular/core';
import { ITodoDetail } from '../../features/todo/interfaces/todo-details.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoService {
    private todoList: ITodoDetail[] = [];
    private todoSubject = new BehaviorSubject<ITodoDetail[]>(this.todoList);

    getTodoObservable() {
        return this.todoSubject.asObservable();
    }

    async setTodoList(todoListToSet: ITodoDetail[]): Promise<ITodoDetail[]> {
        this.todoList = todoListToSet;
        this.todoSubject.next(this.todoList);
        return Promise.resolve(this.todoList);
    }

    async getTodosFromLocalStorage(): Promise<ITodoDetail[]> {
        const savedData = window.localStorage.getItem('todo-list');
        if (savedData) {
            this.todoList = JSON.parse(savedData);
        }

        this.todoSubject.next(this.todoList);
        return Promise.resolve(this.todoList);
    }

    async getTodos(): Promise<ITodoDetail[]> {
        this.todoSubject.next(this.todoList);
        return Promise.resolve(this.todoList);
    }

    async getTodo(id: number): Promise<ITodoDetail | undefined> {
        return Promise.resolve(this.todoList.find((el) => el.id === id));
    }

    async updateTodoList(todoToUpdate: ITodoDetail): Promise<ITodoDetail[]> {
        const todoIndexToFind = this.todoList.findIndex(
            (el) => el.id === todoToUpdate.id,
        );
        if (todoIndexToFind !== -1) {
            this.todoList[todoIndexToFind] = todoToUpdate;
            this.todoSubject.next(this.todoList);
        }

        return Promise.resolve(this.todoList);
    }

    async addTodo(newTodo: ITodoDetail): Promise<void> {
        this.todoList.push(newTodo);
        this.todoSubject.next(this.todoList);
        return Promise.resolve();
    }
}
