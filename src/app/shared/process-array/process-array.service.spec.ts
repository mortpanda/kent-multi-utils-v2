import { TestBed } from '@angular/core/testing';

import { ProcessArrayService } from './process-array.service';

describe('ProcessArrayService', () => {
  let service: ProcessArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
