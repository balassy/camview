import { TestBed, inject } from '@angular/core/testing';

import { FacebookClientService } from './facebook-client.service';

describe('FacebookClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookClientService]
    });
  });

  it('should be created', inject([FacebookClientService], (service: FacebookClientService) => {
    expect(service).toBeTruthy();
  }));
});
