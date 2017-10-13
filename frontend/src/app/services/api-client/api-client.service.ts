import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GetHealthCheckDetailedResult, GetHealthCheckResult } from './api-client.types';
import { AwsRequestSignerService } from './../aws-request-signer/aws-request-signer.service';
import { ConfigService } from './../config/config.service';

@Injectable()
export class ApiClientService {
  private get _baseUrl(): string {
    return this._configService.api.baseUrl;
  }

  public constructor(private _http: Http,
                     private _signerService: AwsRequestSignerService,
                     private _configService: ConfigService) {
  }

  public getHealthCheck(): Promise<GetHealthCheckResult> {
    const opts: RequestOptionsArgs = {
      url: `${this._baseUrl}/health/check`
    };

    return this._http.get(opts.url as string, opts as RequestOptionsArgs)
      .toPromise()
      .then((response: Response) => {
        const body: GetHealthCheckResult = <GetHealthCheckResult> response.json();
        return body;
      })
      .catch((err: Error) => {
        console.error('HTTP Error', err);
        throw err;
      });
  }

  public getHealthCheckDetailed(): Promise<GetHealthCheckDetailedResult> {
    const opts: RequestOptionsArgs = {
      url: `${this._baseUrl}/health/detailed`
    };

    this._signerService.sign(opts);

    return this._http.get(opts.url as string, opts as RequestOptionsArgs)
      .toPromise()
      .then((response: Response) => {
        const body: GetHealthCheckDetailedResult = <GetHealthCheckDetailedResult> response.json();
        return body;
      })
      .catch((err: Error) => {
        console.error('HTTP Error', err);
        throw err;
      });
  }
}
