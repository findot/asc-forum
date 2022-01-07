import { AfterViewInit, Component, Input, ContentChild, HostListener } from '@angular/core';
import { DropdownEntryComponent } from './dropdown-entry/dropdown-entry.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';


@Component({
  selector: 'dropdown',
  template: `
  <div class="dropdown">
    <ng-content></ng-content>
  </div>
  `
})
export class DropdownComponent implements AfterViewInit {

  @Input() id!: string;

  @ContentChild(DropdownEntryComponent)
  dropdownEntry!: DropdownEntryComponent;

  @ContentChild(DropdownMenuComponent)
  dropdownMenu!: DropdownMenuComponent;

  constructor() {}

  ngAfterViewInit(): void {
    this.dropdownEntry.id = this.id;
    this.dropdownEntry.onClick = () => this.onToggle();

    this.dropdownMenu.ariaLabelledBy = this.id;
  }

  /* ---------------------------- Event handling --------------------------- */

  private wasInside = false;
  @HostListener('click')
  clickInside()
  { this.wasInside = true; }

  @HostListener('document:click')
  clickOutside() {
    if (!this.wasInside)
      this.onClose();
    this.wasInside = false;
  }

  onToggle(): void {
    const toggled = !this.dropdownMenu.shown;
    this.dropdownEntry.shown = toggled;
    this.dropdownMenu.shown = toggled;
  }

  onClose(): void {
    this.dropdownEntry.shown = false;
    this.dropdownMenu.shown = false;
  }

}
