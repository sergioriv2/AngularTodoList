export enum AppRoutesEnum {
    // Misc routes
    Blank = '',
    // App routes
    App = 'app',
    TodoList = 'todo-lists',
    TrashLists = 'todo-lists/trash',
    CompletedLists = 'todo-lists/completed',

    // Auth routes
    Auth = 'auth',
    Login = 'login',
    Signup = 'signup',
    AccountActivation = 'account-activation',
}

export enum AppCompleteRoutesEnum {
    // App Routes
    AppRoot = AppRoutesEnum.App,
    TodoList = `${AppRoutesEnum.App}/${AppRoutesEnum.TodoList}`,
    TrashLists = `${AppRoutesEnum.App}/${AppRoutesEnum.TrashLists}`,
    CompletedLists = `${AppRoutesEnum.App}/${AppRoutesEnum.CompletedLists}`,

    // Auth Routes
    AuthRoot = AppRoutesEnum.Auth,
    AuthLogin = `${AppRoutesEnum.Auth}/${AppRoutesEnum.Login}`,
    AuthSignup = `${AppRoutesEnum.Auth}/${AppRoutesEnum.Signup}`,
    AuthAccountActivation = `${AppRoutesEnum.Auth}/${AppRoutesEnum.AccountActivation}`,
}
