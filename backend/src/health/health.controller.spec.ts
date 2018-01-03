import { expect } from 'chai';
import { Chance } from 'chance';
import { instance, mock, reset, when } from 'ts-mockito';

import { ApiContext, ApiEvent, ApiHandler, ApiResponse } from '../../shared/api.interfaces';
import { HttpStatusCode } from '../../shared/http-status-codes';
import { callSuccess } from '../../test';
import { ApiResponseParsed } from '../../test/test.interfaces';
import { HealthController } from './health.controller';
import { ConfigHealthResult, GetHealthCheckDetailedResult, GetHealthCheckResult } from './health.interfaces';
import { HealthService } from './health.service';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('HealthController', () => {
  const healthServiceMock: HealthService = mock(HealthService);
  let controller: HealthController;

  beforeEach(() => {
    reset(healthServiceMock);
    const healthServiceMockInstance: HealthService = instance(healthServiceMock);
    controller = new HealthController(healthServiceMockInstance);
  });

  describe('getHealthCheck function', () => {
    it('should return HTTP 200 OK', async () => {
      const response: ApiResponseParsed<GetHealthCheckResult> = await callSuccess<GetHealthCheckResult>(controller.getHealthCheck);
      expect(response.statusCode).to.equal(HttpStatusCode.Ok);
    });

    it('should return success', async () => {
      const response: ApiResponseParsed<GetHealthCheckResult> = await callSuccess<GetHealthCheckResult>(controller.getHealthCheck);
      expect(response.parsedBody.success).to.equal(true);
    });
  });

  describe('getHealthCheckDetailed function', () => {
    let testData: {
      config: ConfigHealthResult;
      requestId: string;
    };

    beforeEach(() => {
      testData = {
        config: {
          isHostSet: chance.bool(),
          isPasswordSet: chance.bool(),
          isPortSet: chance.bool(),
          isUserSet: chance.bool()
        },
        requestId: chance.word()
      };
      when(healthServiceMock.getConfigHealth()).thenReturn(testData.config);
    });

    it('should return HTTP 200 OK', async () => {
      const response: ApiResponseParsed<GetHealthCheckDetailedResult> = await callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
      expect(response.statusCode).to.equal(HttpStatusCode.Ok);
    });

    it('should return success', async () => {
      const response: ApiResponseParsed<GetHealthCheckDetailedResult> = await callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
      expect(response.parsedBody.success).to.equal(true);
    });

    it('should return the request ID', async () => {
      const response: ApiResponseParsed<GetHealthCheckDetailedResult> = await callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
      expect(response.parsedBody.requestId).to.equal(testData.requestId);
    });

    it('should return the configuration check', async () => {
      const response: ApiResponseParsed<GetHealthCheckDetailedResult> = await callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
      expect(response.parsedBody.config).to.eql(testData.config);
    });

    // tslint:disable-next-line arrow-return-shorthand (Long function body.)
    function callSuccessDetailed(handler: ApiHandler, requestId?: string): Promise<ApiResponseParsed<GetHealthCheckDetailedResult>> {
      // tslint:disable-next-line typedef (Well-known constructor.)
      return new Promise((resolve, reject) => {
        let event: ApiEvent = <ApiEvent> {};
        if (requestId) {
          event = <ApiEvent> {
            requestContext: {
              requestId
            }
          };
        }

        handler(event, <ApiContext> {}, (error?: Error | null, result?: ApiResponse): void => {
          if (typeof result === 'undefined') {
            reject('No result was returned by the handler!');
            return;
          }

          const parsedResult: ApiResponseParsed<GetHealthCheckDetailedResult> = result as ApiResponseParsed<GetHealthCheckDetailedResult>;
          parsedResult.parsedBody = JSON.parse(result.body) as GetHealthCheckDetailedResult;
          resolve(parsedResult);
        });
      });
    }
  });
});
