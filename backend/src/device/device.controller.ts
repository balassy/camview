import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { DeviceInfo } from './device.interfaces';
import { DeviceService } from './device.service';

export class DeviceController {
  public constructor(private _service: DeviceService) {
  }

  public getDeviceInfo: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    this._service.getDeviceInfo()
      .then((result: DeviceInfo) => {
        return ResponseBuilder.ok<DeviceInfo>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
}
