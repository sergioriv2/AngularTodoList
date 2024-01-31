import { ITodoDetail } from '../interfaces/todo-details.interface';

export interface SetTodoListDto {
    trashList?: ITodoDetail[];
    todoList?: ITodoDetail[];
}
