import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CoerceBoolean } from 'src/app/core/lib';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

  @Input() icon!: IconDefinition;
  @Input() variant: string = "light";
  @Input() tooltip?: string;
  @CoerceBoolean() @Input() active?: boolean | string = false;
  @CoerceBoolean() @Input() disabled: boolean | string = false;
  @Input() click?: Function;
  
  constructor() {}

  ngOnInit(): void {}

  get cssClass(): string {
    const base = 'btn btn-action rounded-circle m-1 mb-0';
    const active = this.active ? 'active' : '';
    return `${base} btn-outline-${this.variant} ${active}`;
  }

}
