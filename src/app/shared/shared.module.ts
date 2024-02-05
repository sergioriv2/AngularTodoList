import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export const SHARED_MODULES = [FormFieldComponent];

@NgModule({
    declarations: [...SHARED_MODULES],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    exports: [...SHARED_MODULES],
})
export class SharedModule {}
