import { Component, OnInit } from '@angular/core';
import { faBell, faCog, faCogs, faDoorOpen, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  faBell = faBell;
  faUserAstronaut = faUserAstronaut;
  faCog = faCog;
  faDoorOpen = faDoorOpen;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
