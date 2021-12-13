import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './nav/nav.module';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';


@NgModule({
  declarations: [
    ContainerComponent,
    RowComponent,
    ColComponent
  ],
  exports: [
    NavModule,
    ContainerComponent,
    RowComponent,
    ColComponent
  ],
  imports: [
    CommonModule,
    NavModule
  ]
})
export class SharedModule { }
