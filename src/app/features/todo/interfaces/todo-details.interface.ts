export interface ITodoDetail {
    id: number;
    description: string;
    isComplete: boolean;
    isInTrash: boolean;
    color: string;
    createdAt: Date;
}

export interface ITodoLists {
    trashList: ITodoDetail[];
    todoList: ITodoDetail[];
}
