import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TodoModule } from './features/todo/todo.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CoreModule,
        // SharedModule,

        // Features
        // LoginModule,
        TodoModule,
    ],
    bootstrap: [AppComponent],
    providers: [provideAnimationsAsync()],
})
export class AppModule {}
