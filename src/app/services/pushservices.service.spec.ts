import { TestBed } from '@angular/core/testing';

import { PushservicesService } from './pushservices.service';

describe('PushservicesService', () => {
  let service: PushservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
