import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencesComponent } from './sequences.component';

describe('SequencesComponent', () => {
  let component: SequencesComponent;
  let fixture: ComponentFixture<SequencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
