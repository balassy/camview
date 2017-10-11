import { TestBed, inject } from '@angular/core/testing';

import { AwsCredentialsService } from './aws-credentials.service';

describe('AwsCredentialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwsCredentialsService]
    });
  });

  it('should be created', inject([AwsCredentialsService], (service: AwsCredentialsService) => {
    expect(service).toBeTruthy();
  }));
});
