import { AfterViewInit, Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[no-shadow]'
})
export class NoShadowDirective implements AfterViewInit  {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    [...this.el.nativeElement.children].map(
      el => el.classList.add('shadow-none')
    );
  }


}
