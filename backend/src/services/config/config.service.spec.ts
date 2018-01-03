import { expect } from 'chai';
import { Chance } from 'chance';

import { EnvKeys } from './config.consts';
import { Connection } from './config.interfaces';
import { ConfigService } from './config.service';

const chance: Chance.Chance = new Chance();

describe('ConfigService', () => {
  let envMock: NodeJS.ProcessEnv;
  let service: ConfigService;

  beforeEach(() => {
    envMock = {};
    service = new ConfigService(envMock);
  });

  describe('getConnection function', () => {
    it('should return the connection values when the environment values are set', () => {
      envMock[EnvKeys.Host] = chance.domain();
      envMock[EnvKeys.Password] = chance.word();
      envMock[EnvKeys.Port] = chance.word();
      envMock[EnvKeys.User] = chance.word();

      const result: Connection = service.getConnection();

      expect(result.host).to.equal(envMock[EnvKeys.Host]);
      expect(result.password).to.equal(envMock[EnvKeys.Password]);
      expect(result.port).to.equal(envMock[EnvKeys.Port]);
      expect(result.user).to.equal(envMock[EnvKeys.User]);
    });

    it('should return empty strings when the environment values are not set', () => {
      const result: Connection = service.getConnection();

      expect(result.host).to.equal('');
      expect(result.password).to.equal('');
      expect(result.port).to.equal('');
      expect(result.user).to.equal('');
    });
  });
});
