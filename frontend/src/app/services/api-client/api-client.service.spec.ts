import { TestBed } from '@angular/core/testing';
import { Http, Response } from '@angular/http';
import { Chance } from 'chance';

import { anyString, anything, instance, mock, reset, when, verify } from 'ts-mockito';

import { ApiClientService } from './api-client.service';
import { AwsRequestSignerService } from './../aws-request-signer/aws-request-signer.service';
import { ConfigService } from './../config/config.service';
import { Observable } from 'rxjs/Observable';
import { GetDeviceInfoResult } from './api-client.types';
import { ErrorBody, ApiError } from './api-error';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('ApiClientService', () => {
  let service: ApiClientService;
  const mockAwsRequestSignerService: AwsRequestSignerService = mock(AwsRequestSignerService);
  const mockConfigService: ConfigService = mock(ConfigService);
  const mockHttpService: Http = mock(Http);
  const mockResponse: Response = mock(Response);
  let testBaseUrl: string;

  beforeEach(() => {
    testBaseUrl = chance.url();
    const mockConfigServiceInstance: ConfigService = instance(mockConfigService);
    mockConfigServiceInstance.api = {
      baseUrl: testBaseUrl
    };

    when(mockHttpService.get(anyString(), anything())).thenReturn(Observable.of(instance(mockResponse)));

    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AwsRequestSignerService, useFactory: () => instance(mockAwsRequestSignerService) },
        { provide: ConfigService, useFactory: () => mockConfigServiceInstance },
        { provide: Http, useFactory: () => instance(mockHttpService) }
      ]
    });

    service = TestBed.get(ApiClientService);

    reset(mockAwsRequestSignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO: Create helper functions to simplify testing of the similar endpoints.

  describe('getDeviceInfo', () => {
    it('should sign the request', async () => {
      await service.getDeviceInfo();
      verify(mockAwsRequestSignerService.sign(anything())).once();
    });

    it('should call the /device/info endpoint', async () => {
      await service.getDeviceInfo();
      const expectedUrl: string = `${testBaseUrl}/device/info`;
      verify(mockHttpService.get(expectedUrl, anything())).once();
    });

    it('should return API result on success', async () => {
      const testResult: GetDeviceInfoResult = {
        mac: chance.word(),
        name: chance.word()
      };
      when(mockResponse.json()).thenReturn(testResult);

      const result: GetDeviceInfoResult = await service.getDeviceInfo();

      expect(result).toEqual(testResult);
    });

    it('should throw ApiError on failure', () => {
      const errorResult: ErrorBody = {
        error: {
          code: chance.word(),
          description: chance.word()
        }
      };
      when(mockResponse.json()).thenReturn(errorResult);
      when(mockHttpService.get(anyString(), anything())).thenReturn(Observable.throw(instance(mockResponse)));

      service.getDeviceInfo()
        .catch((err: ApiError) => {
          expect(err instanceof ApiError);
          expect(err.code).toEqual(errorResult.error.code);
          expect(err.description).toEqual(errorResult.error.description);
        });
    });
  });
});
