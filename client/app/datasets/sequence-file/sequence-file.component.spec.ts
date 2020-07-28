import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceFileComponent } from './sequence-file.component';

describe('SequenceFileComponent', () => {
  let component: SequenceFileComponent;
  let fixture: ComponentFixture<SequenceFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
