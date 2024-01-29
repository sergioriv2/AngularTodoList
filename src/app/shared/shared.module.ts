import { NgModule } from '@angular/core';
import { UserDetailsModule } from './modules/user-details.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const SHARED_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    UserDetailsModule,
];

@NgModule({
    providers: [],
    declarations: [],
    imports: [...SHARED_MODULES],
    exports: [...SHARED_MODULES],
})
export class SharedModule {}
