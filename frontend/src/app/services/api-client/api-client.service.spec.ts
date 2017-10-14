import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { instance, mock } from 'ts-mockito';

import { ApiClientService } from './api-client.service';
import { AwsRequestSignerService } from './../aws-request-signer/aws-request-signer.service';
import { ConfigService } from './../config/config.service';

describe('ApiClientService', () => {
  let service: ApiClientService;
  const mockAwsRequestSignerService: AwsRequestSignerService = mock(AwsRequestSignerService);
  const mockConfigService: ConfigService = mock(ConfigService);
  const mockHttpService: Http = mock(Http);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AwsRequestSignerService, useFactory: () => instance(mockAwsRequestSignerService) },
        { provide: ConfigService, useFactory: () => instance(mockConfigService) },
        { provide: Http, useFactory: () => instance(mockHttpService) }
      ]
    });

    service = TestBed.get(ApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
