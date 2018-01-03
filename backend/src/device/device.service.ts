import { GetDeviceInfoResult } from '../services/cam-client/cam-client.interfaces';
import { CamClientService } from '../services/cam-client/cam-client.service';
import { Connection } from '../services/config/config.interfaces';
import { ConfigService } from '../services/config/config.service';
import { DeviceInfo } from './device.interfaces';

export class DeviceService {
  public constructor(private _camClientService: CamClientService,
                     configService: ConfigService) {
    const connection: Connection = configService.getConnection();
    this._camClientService.setConnection(connection);
  }

  public async getDeviceInfo(): Promise<DeviceInfo> {
    const deviceInfo: GetDeviceInfoResult = await this._camClientService.getDeviceInfo();
    return <DeviceInfo> {
      mac: deviceInfo.mac,
      name: deviceInfo.devName
    };
  }
}
