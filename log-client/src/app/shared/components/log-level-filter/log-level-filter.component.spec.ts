import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogLevelFilterComponent } from './log-level-filter.component';

describe('LogLevelFilterComponent', () => {
  let component: LogLevelFilterComponent;
  let fixture: ComponentFixture<LogLevelFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogLevelFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogLevelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
