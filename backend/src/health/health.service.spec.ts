import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { Connection } from '../services/config/config.interfaces';
import { ConfigService } from '../services/config/config.service';
import { ConfigHealthResult } from './health.interfaces';
import { HealthService } from './health.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('HealthService', () => {
  const configServiceMock: ConfigService = mock(ConfigService);
  let service: HealthService;

  beforeEach(() => {
    reset(configServiceMock);
    const configServiceMockInstance: ConfigService = instance(configServiceMock);
    service = new HealthService(configServiceMockInstance);
  });

  describe('getConfigHealth function', () => {
    it('should return the configuration flags as true when config values are set', () => {
      const testConnection: Connection = {
        host: chance.domain(),
        password: chance.word(),
        port: chance.word(),
        user: chance.name()
      };
      when(configServiceMock.getConnection()).thenReturn(testConnection);

      const result: ConfigHealthResult = service.getConfigHealth();

      expect(result.isHostSet).to.equal(true);
      expect(result.isPasswordSet).to.equal(true);
      expect(result.isPortSet).to.equal(true);
      expect(result.isUserSet).to.equal(true);
    });

    it('should return the configuration flags as false when config values are not set', () => {
      const testConnection: Connection = {
        host: '',
        password: '',
        port: '',
        user: ''
      };
      when(configServiceMock.getConnection()).thenReturn(testConnection);

      const result: ConfigHealthResult = service.getConfigHealth();

      expect(result.isHostSet).to.equal(false);
      expect(result.isPasswordSet).to.equal(false);
      expect(result.isPortSet).to.equal(false);
      expect(result.isUserSet).to.equal(false);
    });
  });
});
