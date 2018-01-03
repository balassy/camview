import { Connection } from '../services/config/config.interfaces';
import { ConfigService } from './../services/config/config.service';
import { ConfigHealthResult } from './health.interfaces';

export class HealthService {
  public constructor(private _configService: ConfigService) {
  }

  public getConfigHealth(): ConfigHealthResult {
    const conn: Connection = this._configService.getConnection();
    return {
      isHostSet: !!conn.host,
      isPasswordSet: !!conn.password,
      isPortSet: !!conn.port,
      isUserSet: !!conn.user
    };
  }
}
