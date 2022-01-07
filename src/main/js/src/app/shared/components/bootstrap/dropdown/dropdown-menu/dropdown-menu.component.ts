import { Component, Input } from '@angular/core';
import { Aligned } from '../../../../../../util/Sizing';


@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent {

  _ariaLabelledBy: string = '';
  _shown: boolean = false;

  @Input() align: Aligned = 'start';

  constructor() {}

  public get ariaLabelledBy(): string
  { return this._ariaLabelledBy; }

  public set ariaLabelledBy(ariaLabelledBy: string)
  { this._ariaLabelledBy = ariaLabelledBy; }

  public get shown(): boolean
  { return this._shown; }

  public set shown(shown: boolean)
  { this._shown = shown; }

  public get cssClass(): string {
    return `dropdown-menu dropdown-menu-${this.align}`;
  }

}
