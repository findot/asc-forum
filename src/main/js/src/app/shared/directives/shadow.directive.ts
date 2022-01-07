import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { ShadowBreakpoint } from '../../../util/Sizing';


@Directive({
  selector: '[shadow]'
})
export class ShadowDirective implements AfterViewInit {

  @Input() shadow!: ShadowBreakpoint;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    [...this.el.nativeElement.children].map(
      el => el.classList.add(`shadow-${this.shadow}`)
    );
  }

}

