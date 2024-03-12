// Data interfaces

export interface ITodoDetail {
    id: number;
    description: string;
    isComplete: boolean;
    isInTrash: boolean;
    createdAt: Date;
}

export interface ITodoLists {
    trashList: ITodoDetail[];
    todoList: ITodoDetail[];
}

// App Interfaces

export interface IAppTodoLists {
    [x: string]: ITodoDetail[];
}
