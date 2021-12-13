import { Component, HostBinding, Input } from '@angular/core';
import { Span, Sized, SizedComponent, } from '../../model/Sizing';

@Component({ selector: 'column', templateUrl: './col.component.html' })
export class ColComponent extends SizedComponent {

  @Input() size   ?: Span | Sized;
  @Input() offset ?: Span | Sized;
  @Input() order  ?: Span | Sized;

  @HostBinding('class') get _class(): string
  { return [this.cssOffset, this.cssSize, this.cssOrder].join(' '); }

  private get cssOffset(): string
  { return this.getSized('offset'); }

  private get cssSize(): string
  { return this.getSized('size', 'col', 'col'); }

  private get cssOrder(): string
  { return this.getSized('order'); }

}
