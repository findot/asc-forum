import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavModule } from './components/nav/nav.module';
import { ContainerComponent } from './components/container/container.component';
import { RowComponent } from './components/row/row.component';
import { ColComponent } from './components/col/col.component';
import { InputRowComponent } from './components/input-row/input-row.component';
import { AuthorPipe } from './pipes/author.pipe';
import { DatestringPipe } from './pipes/datestring.pipe';


@NgModule({
  declarations: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent,
    
    AuthorPipe,
    DatestringPipe
  ],
  exports: [
    NavModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent,

    AuthorPipe,
    DatestringPipe
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
