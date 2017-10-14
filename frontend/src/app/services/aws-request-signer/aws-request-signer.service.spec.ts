import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { AwsCredentialsService } from './../aws-credentials/aws-credentials.service';
import { ConfigService } from './../config/config.service';
import { UrlParserService } from './../url-parser/url-parser.service';
import { AwsRequestSignerService } from './aws-request-signer.service';

describe('AwsRequestSignerService', () => {
  const mockAwsCredentialsService: AwsCredentialsService = mock(AwsCredentialsService);
  const mockConfigService: ConfigService = mock(ConfigService);
  const mockUrlParserService: UrlParserService = mock(UrlParserService);
  let service: AwsRequestSignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AwsRequestSignerService,
        { provide: AwsCredentialsService, useFactory: () => instance(mockAwsCredentialsService) },
        { provide: ConfigService, useFactory: () => instance(mockConfigService) },
        { provide: UrlParserService, useFactory: () => instance(mockUrlParserService) }
      ]
    });

    service = TestBed.get(AwsRequestSignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
