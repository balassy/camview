import { GetDeviceInfoResult } from '../services/cam-client/cam-client.interfaces';
import { CamClientService } from '../services/cam-client/cam-client.service';
import { DeviceInfo } from './device.interfaces';

export class DeviceService {
  public constructor(private _camClientService: CamClientService) {
  }

  public async getDeviceInfo(): Promise<DeviceInfo> {
    const deviceInfo: GetDeviceInfoResult = await this._camClientService.getDeviceInfo();
    return <DeviceInfo> {
      mac: deviceInfo.mac,
      name: deviceInfo.devName
    };
  }
}
