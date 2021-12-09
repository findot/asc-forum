import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRowComponent } from './input-row.component';

describe('InputRowComponent', () => {
  let component: InputRowComponent;
  let fixture: ComponentFixture<InputRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
