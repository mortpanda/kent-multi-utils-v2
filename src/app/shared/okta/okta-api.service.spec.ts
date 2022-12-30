import { TestBed } from '@angular/core/testing';

import { OktaApiService } from './okta-api.service';

describe('OktaApiService', () => {
  let service: OktaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
