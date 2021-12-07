import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from '../../../app-routing.module';

import { LoginButtonComponent } from './login-button/login-button.component'
import { SearchboxComponent } from './searchbox/searchbox.component';
import { SectionsLinksComponent } from './sections-links/sections-links.component';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    LoginButtonComponent,
    SearchboxComponent,
    SectionsLinksComponent,
    LogoComponent,
    NavComponent
  ],
  exports: [
    NavComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule
  ]
})
export class NavModule { }
