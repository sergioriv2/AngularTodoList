import { NgModule } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth.routing-module';

const SHARED_COMPONENTS: any = [LoginComponent, AuthComponent];

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    providers: [AuthService],
    imports: [CommonModule, AuthRoutingModule],
    exports: [...SHARED_COMPONENTS],
})
export class AuthModule {}
