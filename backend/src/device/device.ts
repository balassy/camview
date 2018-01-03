import { ApiHandler } from '../../shared/api.interfaces';
import { CamClientService } from './../services/cam-client/cam-client.service';
import { ConfigService } from './../services/config/config.service';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

const configService: ConfigService = new ConfigService(process.env);
const camClientService: CamClientService = new CamClientService(configService);
const service: DeviceService = new DeviceService(camClientService);
const controller: DeviceController = new DeviceController(service);

export const getDeviceInfo: ApiHandler = controller.getDeviceInfo;
