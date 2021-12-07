import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsLinksComponent } from './sections-links.component';

describe('SectionsLinksComponent', () => {
  let component: SectionsLinksComponent;
  let fixture: ComponentFixture<SectionsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
