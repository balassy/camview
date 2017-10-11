import { TestBed, inject } from '@angular/core/testing';

import { AwsRequestSignerService } from './aws-request-signer.service';

describe('AwsRequestSignerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsRequestSignerService]
    });
  });

  it('should be created', inject([AwsRequestSignerService], (service: AwsRequestSignerService) => {
    expect(service).toBeTruthy();
  }));
});
