import { Component, HostBinding, Input } from '@angular/core';
import { CoerceBoolean } from 'src/app/core/lib';
import { Rule, Sized, SizedComponent } from '../../../../../util/Sizing';


@Component({ selector: 'row', templateUrl: './row.component.html' })
export class RowComponent extends SizedComponent {

  @Input('cols')      cols    ?: Rule | Sized;
  @Input('gutter')    gutter  ?: Rule | Sized;
  @Input('x-gutter')  xGutter ?: Rule | Sized;
  @Input('y-gutter')  yGutter ?: Rule | Sized;
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

