import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, verify, when } from 'ts-mockito';

import { Connection } from '../config/config.interfaces';
import { ConfigService } from '../config/config.service';
import { CamClientService } from './cam-client.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('CamClientService', () => {
  const configServiceMock: ConfigService = mock(ConfigService);
  let configServiceMockInstance: ConfigService;
  let service: CamClientService;

  beforeEach(() => {
    reset(configServiceMock);
    configServiceMockInstance = instance(configServiceMock);
  });

  describe('ctor', () => {
    it('should throw an error if the ConfigService is not specified', () => {
      const noService: ConfigService = <any> undefined;  // tslint:disable-line no-any (Bypass the TypeScript Compiler warning for required parameter.)
      expect(() => new CamClientService(noService)).to.throw('Please specify the configService!');
    });

    it('should load the connection parameters', () => {
      const testConnection: Connection = {
        host: chance.domain(),
        password: chance.word(),
        port: chance.word(),
        user: chance.word()
      };
      when(configServiceMock.getConnection()).thenReturn(testConnection);

      service = new CamClientService(configServiceMockInstance);

      verify(configServiceMock.getConnection()).once();
      expect(service.connection).to.eql(testConnection);
    });

    it('should throw an error if the ConfigService returns invalid connection parameters', () => {
      const noConnection: Connection = <any> undefined;    // tslint:disable-line no-any (Bypass the TypeScript Compiler warning.)
      when(configServiceMock.getConnection()).thenReturn(noConnection);

      expect(() => new CamClientService(configServiceMockInstance)).to.throw('The ConfigService has not returned valid connection parameters!');
    });
  });
});
