import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDividerComponent } from './dropdown-divider.component';

describe('DropdownDividerComponent', () => {
  let component: DropdownDividerComponent;
  let fixture: ComponentFixture<DropdownDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
