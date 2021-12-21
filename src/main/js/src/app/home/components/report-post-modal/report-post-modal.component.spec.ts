import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostModalComponent } from './report-post-modal.component';

describe('ReportPostModalComponent', () => {
  let component: ReportPostModalComponent;
  let fixture: ComponentFixture<ReportPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPostModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
