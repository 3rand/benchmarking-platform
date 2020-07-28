import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkDetailsComponent } from './benchmark-details.component';

describe('BenchmarkDetailsComponent', () => {
  let component: BenchmarkDetailsComponent;
  let fixture: ComponentFixture<BenchmarkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
