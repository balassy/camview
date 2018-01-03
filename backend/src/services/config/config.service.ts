import { EnvKeys } from './config.consts';
import { Connection } from './config.interfaces';

export class ConfigService {
  public constructor(private _env: NodeJS.ProcessEnv) {
  }

  public getConnection(): Connection {
    return {
      host: this._getEnvValue(EnvKeys.Host),
      password: this._getEnvValue(EnvKeys.Password),
      port: this._getEnvValue(EnvKeys.Port),
      user: this._getEnvValue(EnvKeys.User),
    };
  }

  private _getEnvValue(keyName: string): string {
    if (!keyName) {
      throw new Error('Please specify the keyName!');
    }

    const rawValue: string | undefined = this._env[keyName];

    return rawValue ? rawValue : '';
  }
}
