import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

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
export class InputRowComponent<T> implements OnInit, ControlValueAccessor {

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
  @Input() required:    boolean = true;
  @Input() name!:       string;
  @Input() label!:      string;
  @Input() id!:         string;

  @Input() formControl!: FormControl;
  @Input() msgInvalid?: string;

  constructor(
    private errorHandlerService: ErrorHandlerService
  ) { }

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

  // Tooltip handling
  @Input() tooltipPlacement: string = 'top';

  onHover(inout: boolean, tooltip: NgbTooltip) {
    if (!inout && tooltip.isOpen())
      return tooltip.close();
    if (inout && !this.formControl.pristine && !this.formControl.valid)
      tooltip.open();
  }

  get error(): string | null {
    return this.formControl.errors
      ? this.errorHandlerService.validationMessage(
        this.label, this.formControl.errors
      )
      : null;
  }

}
