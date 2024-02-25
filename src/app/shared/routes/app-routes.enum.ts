export enum AppRoutesEnum {
    // Misc routes
    Blank = '',
    // App routes
    App = 'app',
    TodoList = 'todo-list',
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

    // Auth Routes
    AuthRoot = AppRoutesEnum.Auth,
    AuthLogin = `${AppRoutesEnum.Auth}/${AppRoutesEnum.Login}`,
    AuthSignup = `${AppRoutesEnum.Auth}/${AppRoutesEnum.Signup}`,
    AuthAccountActivation = `${AppRoutesEnum.Auth}/${AppRoutesEnum.AccountActivation}`,
}
