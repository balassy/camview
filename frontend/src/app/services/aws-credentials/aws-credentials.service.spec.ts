import { TestBed } from '@angular/core/testing';
import * as AWS from 'aws-sdk';
import * as Chance from 'chance';
import { anyString, instance, mock, when } from 'ts-mockito';

import { ConfigService } from './../config/config.service';
import { ProgressService } from './../progress/progress.service';
import { AwsCredentialsService } from './aws-credentials.service';

const chance = new Chance();

describe('AwsCredentialsService', () => {
  let service: AwsCredentialsService;
  const mockConfigService: ConfigService = mock(ConfigService);
  const mockProgressService: ProgressService = mock(ProgressService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AwsCredentialsService,
        { provide: ConfigService, useFactory: () => instance(mockConfigService) },
        { provide: ProgressService, useFactory: () => instance(mockProgressService) }
      ]
    });

    service = TestBed.get(AwsCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentCredentials property', () => {
    afterEach(() => {
      // Reset the touched properties of the global AWS.config object.
      AWS.config.credentials = null;
    });

    it('should return the current AWS credentials', () => {
      const testCredentials: AWS.Credentials = new AWS.Credentials({
        accessKeyId: chance.word(),
        secretAccessKey: chance.word(),
        sessionToken: chance.word()
      });
      AWS.config.credentials = testCredentials;
      expect(service.currentCredentials.accessKeyId).toEqual(testCredentials.accessKeyId);
      expect(service.currentCredentials.secretAccessKey).toEqual(testCredentials.secretAccessKey);
      expect(service.currentCredentials.sessionToken).toEqual(testCredentials.sessionToken);
    });
  });

  describe('update function', () => {
    afterEach(() => {
      // Reset the touched properties of the global AWS.config object.
      AWS.config.region = undefined;
    });

    it('should set the AWS region from config', () => {
      const testRegion = chance.word();
      when(mockConfigService.aws).thenReturn({region: testRegion, identityPoolId: anyString()});
      service.update(null);
      expect(AWS.config.region).toEqual(testRegion);
    });
  });
});
