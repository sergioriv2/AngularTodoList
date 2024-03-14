import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITodoDetail } from '../../interfaces/todo-details.interface';
import { TodoService } from '../../services/todo.service';
import { TodoListTypes } from '../../../../common/enums/todo-list-types.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoCleanDialogComponent } from '../todo-clean-dialog/todo-clean-dialog.component';
import { Subscription } from 'rxjs';
import dayjs from 'dayjs';

const today = new Date();
const yesterday = dayjs(new Date()).subtract(1, 'day').toDate();
const tomorrow = dayjs(new Date()).add(1, 'day').toDate();

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnDestroy, OnInit {
    @Input()
    dateDetails!: string;

    @Input()
    todoList: ITodoDetail[] = [];

    todoListTypes = TodoListTypes;
    private listSubscription: Subscription;

    dateWeekday!: string;
    dateLabel!: string;

    constructor(private readonly todoService: TodoService) {
        this.listSubscription = this.todoService.todoList$.subscribe({
            next: (lists) => {
                console.log({
                    lists,
                });
                // if (lists[this.dateDetails]) {
                //     this.todoList = lists[this.dateDetails];
                // }
            },
        });
    }

    ngOnInit(): void {
        const isDateToday =
            this.dateDetails === dayjs(today).format('MM-DD-YYYY');
        const isDateTomorrow =
            this.dateDetails === dayjs(tomorrow).format('MM-DD-YYYY');
        const isDateYesterday =
            this.dateDetails === dayjs(yesterday).format('MM-DD-YYYY');

        this.dateWeekday = dayjs(this.dateDetails).format('dddd DD');

        if (isDateToday) {
            this.dateLabel = 'Today';
        } else if (isDateTomorrow) {
            this.dateLabel = 'Tomorrow';
        } else if (isDateYesterday) {
            this.dateLabel = 'Yesterday';
        } else {
            this.dateLabel = dayjs(this.dateDetails).format('dddd');
            this.dateWeekday = dayjs(this.dateDetails).format('MMM DD');
        }
    }

    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
    }

    // transformTodoList() {
    //     this.todoList = this.todoList.map((el) => {
    //         return {
    //             ...el,
    //             isInTrash: this.todoType === TodoListTypes.Trash,
    //         };
    //     });
    // }

    // openTrashDialog() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;

    //     const dialogRef = this.cleanTrashDialog.open(TodoCleanDialogComponent, {
    //         data: {
    //             todoType: this.todoType,
    //             todoList: this.todoList,
    //         },
    //     });
    //     dialogRef.afterClosed().subscribe((result: ITodoDetail[]) => {
    //         if (result) {
    //             this.todoList = result;
    //         }
    //     });
    // }

    // async restoreTodosInTrash() {
    //     if (this.todoType === TodoListTypes.Trash) {
    //         const allTodosList = await this.todoService.getAllTodosList();
    //         const concatenatedList = allTodosList.todoList.concat(
    //             allTodosList.trashList.map((el) => {
    //                 return {
    //                     ...el,
    //                     isInTrash: false,
    //                 };
    //             }),
    //         );

    //         await this.todoService.setTodoList({
    //             todoList: concatenatedList,
    //             trashList: [],
    //         });

    //         this.todoList = [];
    //     } else return;
    // }
}
