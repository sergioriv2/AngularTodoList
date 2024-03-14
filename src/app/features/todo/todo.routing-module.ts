import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutesEnum } from '../../shared/routes/app-routes.enum';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { AppViewComponenet } from './components/app-view/app-view.component';
import { TodoTrashListView } from './components/todo-trash-list-view/todo-trash-list.view';
import { TodoCompletedListsView } from './components/todo-completed-lists-view/todo-completed-lists.view';

const routes: Route[] = [
    {
        path: AppRoutesEnum.Blank,
        component: AppViewComponenet,
        children: [
            {
                path: AppRoutesEnum.TodoList,
                component: TodoViewComponent,
                data: {
                    animation: 'TodoList',
                },
            },
            {
                path: AppRoutesEnum.CompletedLists,
                component: TodoCompletedListsView,
                data: {
                    animation: 'CompleteList',
                },
            },
            {
                path: AppRoutesEnum.TrashLists,
                component: TodoTrashListView,
                data: {
                    animation: 'TrashList',
                },
            },
            {
                path: AppRoutesEnum.Blank,
                redirectTo: AppRoutesEnum.TodoList,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TodoRoutingModule {}
