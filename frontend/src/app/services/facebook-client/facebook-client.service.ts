import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse, LoginStatus } from 'ngx-facebook';
export { LoginOptions, LoginResponse, LoginStatus } from 'ngx-facebook';

import { ConfigService } from './../config/config.service';
import { ApiMethod } from './facebook-client.types';

@Injectable()
export class FacebookClientService {

  constructor(private _configService: ConfigService,
              private _facebookService: FacebookService) {
  }

  public init(): Promise<any> {
    const initParams: InitParams = {
      appId: this._configService.facebook.appId,
      xfbml: true,
      version: this._configService.facebook.version,
      status: true
    };

    return this._facebookService.init(initParams);
  }

  public getLoginStatus(): Promise<LoginStatus> {
    return this._facebookService.getLoginStatus();
  }

  public login(options?: LoginOptions): Promise<LoginResponse> {
    return this._facebookService.login(options);
  }

  public logout(): Promise<any> {
    return this._facebookService.logout();
  }

  public api(path: string, method?: ApiMethod, params?: any): Promise<any> {
    return this._facebookService.api(path, method, params);
  }
}
