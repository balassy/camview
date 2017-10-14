import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { instance, mock } from 'ts-mockito';

import { AwsCredentialsService } from './../aws-credentials/aws-credentials.service';
import { FacebookClientService } from './../facebook-client/facebook-client.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const mockRouter = mock(Router);
  const mockAwsCredentialsService = mock(AwsCredentialsService);
  const mockFacebookClientService = mock(FacebookClientService);
  let service: AuthService;

  beforeEach(() => {
    /*mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };*/

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AwsCredentialsService, useFacebory: () => instance(mockAwsCredentialsService) },
        { provide: FacebookClientService, useFactory: () => instance(mockFacebookClientService) },
        { provide: Router, useFactory: () => instance(mockRouter) }
      ]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
