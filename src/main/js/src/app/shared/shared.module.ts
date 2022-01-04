import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from './components/nav/nav.component';
import { ContainerComponent } from './components/bootstrap/container/container.component';
import { RowComponent } from './components/bootstrap/row/row.component';
import { ColComponent } from './components/bootstrap/col/col.component';
import { InputRowComponent } from './components/input-row/input-row.component';
import { AuthorPipe } from './pipes/author.pipe';
import { DatestringPipe } from './pipes/datestring.pipe';
import { CardComponent } from './components/bootstrap/card/card.component';
import { CardBodyComponent } from './components/bootstrap/card-body/card-body.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserMenuComponent } from './components/nav/user-menu/user-menu.component';
import { SearchboxComponent } from './components/nav/searchbox/searchbox.component';
import { SectionsLinksComponent } from './components/nav/sections-links/sections-links.component';
import { AppRoutingModule } from '../app-routing.module';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent,
    
    AuthorPipe,
    DatestringPipe,
    CardComponent,
    CardBodyComponent,
    AvatarComponent,

    UserMenuComponent,
    SearchboxComponent,
    SectionsLinksComponent,
    LogoComponent,
    NavComponent
  ],
  exports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    InputRowComponent,
    CardComponent,
    CardBodyComponent,
    AvatarComponent,
    NavComponent,

    AuthorPipe,
    DatestringPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
