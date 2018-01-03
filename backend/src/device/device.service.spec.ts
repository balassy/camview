import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { GetDeviceInfoResult } from '../services/cam-client/cam-client.interfaces';
import { CamClientService } from '../services/cam-client/cam-client.service';
import { DeviceInfo } from './device.interfaces';
import { DeviceService } from './device.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('DeviceService', () => {
  const camClientServiceMock: CamClientService = mock(CamClientService);
  let service: DeviceService;

  beforeEach(() => {
    reset(camClientServiceMock);
    const camClientServiceMockInstance: CamClientService = instance(camClientServiceMock);
    service = new DeviceService(camClientServiceMockInstance);
  });

  describe('getDeviceInfo function', () => {
    it('should return the device information', async () => {
      const testResult: GetDeviceInfoResult = {
        devName: chance.word(),
        mac: chance.word()
      };
      when(camClientServiceMock.getDeviceInfo()).thenReturn(Promise.resolve<GetDeviceInfoResult>(testResult));

      const deviceInfo: DeviceInfo = await service.getDeviceInfo();

      expect(deviceInfo.mac).to.equal(testResult.mac);
      expect(deviceInfo.name).to.equal(testResult.devName);
    });
  });
});
