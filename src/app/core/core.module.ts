import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        AppRoutingModule,
        BrowserModule,
    ],
    providers: [],
    exports: [HttpClientModule, AppRoutingModule, BrowserModule],
})
export class CoreModule {}
