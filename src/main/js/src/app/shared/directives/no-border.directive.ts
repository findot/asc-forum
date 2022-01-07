import { AfterViewInit, Component, Directive, ElementRef, TemplateRef, ViewChildren } from '@angular/core';

@Directive({
  selector: '[no-border]'
})
export class NoBorderDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Need to map over the children elements or the class will be added to the
    // shadow DOM element, which is usually not what we want
    [...this.el.nativeElement.children].map(
      el => el.classList.add('border-0')
    );
  }

}
