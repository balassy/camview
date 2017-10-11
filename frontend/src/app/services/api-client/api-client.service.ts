import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AwsRequestSignerService} from './../aws-request-signer/aws-request-signer.service';
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

  public getHealthCheck(): Promise<any> {
    const opts: RequestOptionsArgs = {
      url: `${this._baseUrl}/health/check`
    }

    return this._http.get(opts.url as string, opts as RequestOptionsArgs)
      .toPromise()
      .then((response) => {
        const body = response.json();
        return <boolean> (<any>body).success;
      })
      .catch((err: Error) => {
        console.error('HTTP Error', err);
      });
  }

  public getHealthCheckDetailed(): Promise<any> {
    const opts: RequestOptionsArgs = {
      url: `${this._baseUrl}/health/detailed`
    }

    this._signerService.sign(opts);

    return this._http.get(opts.url as string, opts as RequestOptionsArgs)
      .toPromise()
      .then((response) => {
        const body = response.json();
        return body;
      })
      .catch((err: Error) => {
        console.error('HTTP Error', err);
      });
  }
}
