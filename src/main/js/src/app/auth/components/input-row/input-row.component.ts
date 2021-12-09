import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRowComponent),
      multi: true
    }
  ]
})
export class InputRowComponent<T> implements OnInit {

  private _value?: T; // Internal value

  get value()
  { return this._value; }

  set value(value) {
    this._value = value;
    this.onChange(value);
  }

  /* ControlValueAccessor props */
  disabled: boolean = false;
  onChange: any     = () => {}; // ControlValueAccessor callback
  onTouch : any     = () => {}; // ControlValueAccessor callback

  /* Props */
  @Input() type:        string  = 'text';
  @Input() required:    boolean = false;
  @Input() name!:       string;
  @Input() label!:      string;
  @Input() id!:         string;

  @Input() valid:       boolean = true;
  @Input() dirty:       boolean = false;
  @Input() msgInvalid?: string;

  constructor() { }

  ngOnInit(): void {}

  /* ControlValueAccessor implementation */

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
