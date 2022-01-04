import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { assert, CoerceBoolean } from '../../../../core/lib';


@Component({ selector: 'container', templateUrl: './container.component.html' })
export class ContainerComponent implements OnInit {

  @Input() @CoerceBoolean() xs !: boolean | string;
  @HostBinding("class.container-xs") get _xs() { return this.xs; }

  @Input() @CoerceBoolean() sm !: boolean | string;
  @HostBinding("class.container-sm") get _sm() { return this.sm; }

  @Input() @CoerceBoolean() md !: boolean | string;
  @HostBinding("class.container-md") get _md() { return this.md; }

  @Input() @CoerceBoolean() lg !: boolean | string;
  @HostBinding("class.container-lg") get _lg() { return this.lg; }

  @Input() @CoerceBoolean() xl !: boolean | string;
  @HostBinding("class.container-xl") get _xl() { return this.xl; }

  @Input() @CoerceBoolean() xxl !: boolean | string;
  @HostBinding("class.container-xxl") get _xxl() { return this.xxl; }

  @Input() @CoerceBoolean() fluid !: boolean | string;
  @HostBinding("class.container-fluid") get _fluid() { return this.fluid; }

  private get spans(): boolean[] {
    const keys: (keyof this)[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'];
    return keys.map(k => Boolean(this[k]));
  }

  @HostBinding("class.container") get default(): boolean
  { return this.spans.filter(x => x).length == 0; }

  ngOnInit(): void {
    const spans = this.spans.filter(x => x).length;
    assert(
      spans <= 1,
      `Only one size max may be specified (${spans} were specified)`
    );
  }

}
