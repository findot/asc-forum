import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './nav/nav.module';


@NgModule({
  declarations: [
  ],
  exports: [
    NavModule,
  ],
  imports: [
    CommonModule,
    NavModule
  ]
})
export class SharedModule { }
