import { TestBed } from '@angular/core/testing';

import { LogLevelService } from './log-level.service';

describe('LogLevelService', () => {
  let service: LogLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
