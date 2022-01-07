import { Component } from '@angular/core';
import { CoerceBoolean } from 'src/app/core/lib';

@Component({
  selector: 'dropdown-item',
  templateUrl: './dropdown-item.component.html'
})
export class DropdownItemComponent {

  @CoerceBoolean() link?: string;

  constructor() {}

}
