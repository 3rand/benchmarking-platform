import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSequencesComponent } from './add-sequences.component';

describe('AddSequencesComponent', () => {
  let component: AddSequencesComponent;
  let fixture: ComponentFixture<AddSequencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSequencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
