import { Component, HostBinding, Input } from '@angular/core';
import { Variant } from 'src/app/core/interfaces/Variant';
import { CoerceBoolean } from 'src/app/core/lib';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() background?: Variant;
  @Input() text?: Variant;
  @CoerceBoolean() @Input('no-border') noBorder: boolean | string = false;
  @Input('class') _cssClass: string = '';

  constructor() {}

  get cssClass(): string {
    const bg = this.background ? `bg-${this.background}` : '';
    const text = this.text ? `text-${this.text}` : '';
    return `card ${bg} ${text} ${this.noBorder ? 'border-0' : ''} ${this._cssClass}`;
  }

}
