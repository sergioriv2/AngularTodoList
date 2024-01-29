export interface ITodoDetail {
    id: number;
    description: string;
    isComplete: boolean;
    isInTrash: boolean;
}

export interface ITodoList {
    // id: number;
    list: ITodoDetail[];
}
