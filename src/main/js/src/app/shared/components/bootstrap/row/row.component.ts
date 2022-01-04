import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CoerceBoolean } from 'src/app/core/lib';
import { Order, Sized, SizedComponent } from '../../../model/Sizing';


@Component({ selector: 'row', templateUrl: './row.component.html' })
export class RowComponent extends SizedComponent {

  @Input('cols')      cols    ?: Order | Sized;
  @Input('gutter')    gutter  ?: Order | Sized;
  @Input('x-gutter')  xGutter ?: Order | Sized;
  @Input('y-gutter')  yGutter ?: Order | Sized;
  @CoerceBoolean() @Input('no-gutter') noGutters!: boolean | string; 

  @HostBinding('class') get _class(): string {
    return [
      this.cssColumn,
      this.cssGutter,
      this.cssXGutter,
      this.cssYGutter
    ].join(' ');
  }

  private get cssColumn(): string
  { return this.getSized('cols', 'row'); }

  private get cssGutter(): string
  { return this.getSized('gutter', '', 'g'); }

  private get cssXGutter(): string
  { return this.getSized('xGutter', '', 'gx'); }

  private get cssYGutter(): string
  { return this.getSized('yGutter', '', 'gy'); }

}

