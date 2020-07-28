import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermlineComponent } from './germline.component';

describe('GermlineComponent', () => {
  let component: GermlineComponent;
  let fixture: ComponentFixture<GermlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
