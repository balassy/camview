import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, InternalServerErrorResult, NotFoundResult } from '../../shared/errors';
import { HttpStatusCode } from '../../shared/http-status-codes';
import { callFailure, callSuccess } from '../../test';
import { ApiErrorResponseParsed, ApiResponseParsed } from '../../test/test.interfaces';
import { DeviceController } from './device.controller';
import { DeviceInfo } from './device.interfaces';
import { DeviceService } from './device.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('DeviceController', () => {
  const deviceServiceMock: DeviceService = mock(DeviceService);
  let controller: DeviceController;

  beforeEach(() => {
    reset(deviceServiceMock);
    const deviceServiceMockInstance: DeviceService = instance(deviceServiceMock);
    controller = new DeviceController(deviceServiceMockInstance);
  });

  describe('getDeviceInfo function', () => {
    describe('success', () => {
      let testData: {
        mac: string;
        name: string;
      };

      beforeEach(() => {
        testData = {
          mac: chance.word(),
          name: chance.word()
        };
        when(deviceServiceMock.getDeviceInfo()).thenReturn(Promise.resolve<DeviceInfo>(testData));
      });

      it('should return HTTP 200 OK', async () => {
        const response: ApiResponseParsed<DeviceInfo> = await callSuccess<DeviceInfo>(controller.getDeviceInfo);
        expect(response.statusCode).to.equal(HttpStatusCode.Ok);
      });

      it('should return the device information', async () => {
        const response: ApiResponseParsed<DeviceInfo> = await callSuccess<DeviceInfo>(controller.getDeviceInfo);
        expect(response.parsedBody.mac).to.eql(testData.mac);
        expect(response.parsedBody.name).to.eql(testData.name);
      });
    });

    describe('service failures', () => {
      let testError: {
        code: string;
        description: string;
      };

      beforeEach(() => {
        testError = {
          code: chance.word(),
          description: chance.sentence()
        };
      });

      it('should return Forbidden for a camera without permission', async () => {
        const errorResult: ForbiddenResult = new ForbiddenResult(testError.code, testError.description);
        when(deviceServiceMock.getDeviceInfo()).thenReturn(Promise.reject(errorResult));
        await callAndCheckError(HttpStatusCode.Forbidden, errorResult);
      });

      it('should return Not Found for a non-existing camera', async () => {
        const errorResult: NotFoundResult = new NotFoundResult(testError.code, testError.description);
        when(deviceServiceMock.getDeviceInfo()).thenReturn(Promise.reject(errorResult));
        await callAndCheckError(HttpStatusCode.NotFound, errorResult);
      });

      it('should return Internal Server Error for a service failure', async () => {
        const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
        when(deviceServiceMock.getDeviceInfo()).thenReturn(Promise.reject(new Error()));
        await callAndCheckError(HttpStatusCode.InternalServerError, errorResult);
      });

      async function callAndCheckError(expectedHttpStatusCode: number, errorResult: ErrorResult): Promise<void> {
        const response: ApiErrorResponseParsed = await callFailure(controller.getDeviceInfo);
        expect(response.statusCode).to.equal(expectedHttpStatusCode);

        expect(response.parsedBody.error.code).to.equal(errorResult.code);
        expect(response.parsedBody.error.description).to.equal(errorResult.description);
      }
    });
  });
});
