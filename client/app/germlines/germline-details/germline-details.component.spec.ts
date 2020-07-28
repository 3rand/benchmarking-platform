import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermlineDetailsComponent } from './germline-details.component';

describe('GermlineDetailsComponent', () => {
  let component: GermlineDetailsComponent;
  let fixture: ComponentFixture<GermlineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermlineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
