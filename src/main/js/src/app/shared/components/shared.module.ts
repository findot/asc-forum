import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from './nav/nav.module';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { ColComponent } from './col/col.component';
import { InputRowComponent } from './input-row/input-row.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent
  ],
  exports: [
    NavModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NavModule
  ]
})
export class SharedModule { }
