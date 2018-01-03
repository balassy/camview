import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetHealthCheckDetailedResult, GetHealthCheckResult } from './health.interfaces';
import { HealthService } from './health.service';

export class HealthController {
  public constructor(private _healthService: HealthService) {
  }

  public getHealthCheck: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    const result: GetHealthCheckResult = {
      success: true
    };

    ResponseBuilder.ok<GetHealthCheckResult>(result, callback);
  }

  public getHealthCheckDetailed: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    const result: GetHealthCheckDetailedResult = {
      config: this._healthService.getConfigHealth(),
      requestId: event.requestContext.requestId,
      success: true
    };

    ResponseBuilder.ok<GetHealthCheckDetailedResult>(result, callback);
  }
}
