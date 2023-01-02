import { TestBed } from '@angular/core/testing';

import { WorldtimeService } from './worldtime.service';

describe('WorldtimeService', () => {
  let service: WorldtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
