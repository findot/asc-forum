import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { sized, Ruled } from '../../../util/Sizing';

@Directive({
  selector: '[border]'
})
export class BorderDirective implements AfterViewInit {

  @Input() border!: Ruled;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    [...this.el.nativeElement.children].map(
      el => el.classList.add(sized('border', this.border))
    );
  }

}
