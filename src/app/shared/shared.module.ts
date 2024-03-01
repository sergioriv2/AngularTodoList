import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormService } from './services/form.service';
import { MainFormComponent } from './components/main-form/main-form.component';

export const SHARED_MODULES = [FormFieldComponent, MainFormComponent];

@NgModule({
    declarations: [...SHARED_MODULES],
    providers: [FormService],
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
