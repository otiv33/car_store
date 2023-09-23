import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule { }
