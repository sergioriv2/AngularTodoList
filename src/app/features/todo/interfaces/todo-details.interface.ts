export interface ITodoDetail {
    id: number;
    description: string;
    isComplete: boolean;
    isInTrash: boolean;
    color: string;
}

export interface ITodoLists {
    trashList: ITodoDetail[];
    todoList: ITodoDetail[];
}
