export interface ITodoDetail {
    id: number;
    description: string;
    isComplete: boolean;
    isInTrash: boolean;
}

export interface ITodoLists {
    trashList: ITodoDetail[];
    todoList: ITodoDetail[];
}
