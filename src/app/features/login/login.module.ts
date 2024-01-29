import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';

export const SHARED_COMPONENTS = [LoginComponent];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    exports: [...SHARED_COMPONENTS],
})
export class LoginModule {}
