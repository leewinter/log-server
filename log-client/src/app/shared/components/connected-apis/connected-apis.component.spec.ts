import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedApisComponent } from './connected-apis.component';

describe('ConnectedApisComponent', () => {
  let component: ConnectedApisComponent;
  let fixture: ComponentFixture<ConnectedApisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedApisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
