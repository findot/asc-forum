import { Component, Input } from '@angular/core';
import { Variant } from 'src/app/core/interfaces/Variant';
import { CoerceBoolean } from 'src/app/core/lib';

@Component({
  selector: 'dropdown-entry',
  templateUrl: './dropdown-entry.component.html',
  styleUrls: ['./dropdown-entry.component.scss']
})
export class DropdownEntryComponent {

  private _id: string = '';
  private _shown: boolean = false;

  @Input() variant: Variant = 'primary';
  @CoerceBoolean() @Input() rounded: boolean | string = false;
  @CoerceBoolean() @Input('rounded-circle') roundedCircle: boolean | string = false;

  public onClick!: Function;

  constructor() {}

  public set id(id: string)
  { this._id = id; }

  public get id(): string
  { return this._id; }

  public get shown(): boolean
  { return this._shown; }

  public set shown(shown: boolean)
  { this._shown = shown; }
}
