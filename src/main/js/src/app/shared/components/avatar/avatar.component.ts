import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { string } from 'fp-ts';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() size?: SizeProp;
  @Input('class') _cssClass: string = '';

  faUserAstronaut = faUserAstronaut;

  constructor() { }

  get cssClass(): string {
    return `bg-light rounded-circle avatar avatar-${this.size} ${this._cssClass}`;
  }

}
