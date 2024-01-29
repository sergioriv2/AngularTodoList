import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './features/login/login.module';
import { TodoModule } from './features/todo/todo.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        // SharedModule,

        // Features
        LoginModule,
        TodoModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
