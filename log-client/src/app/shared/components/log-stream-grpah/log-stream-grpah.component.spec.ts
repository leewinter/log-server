import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogStreamGrpahComponent } from './log-stream-grpah.component';

describe('LogStreamGrpahComponent', () => {
  let component: LogStreamGrpahComponent;
  let fixture: ComponentFixture<LogStreamGrpahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogStreamGrpahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogStreamGrpahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
