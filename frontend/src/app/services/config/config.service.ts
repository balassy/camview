import { Injectable } from '@angular/core';
import { ApiConfig, AwsConfig, FacebookConfig } from './config.types';

@Injectable()
export class ConfigService {
  public facebook: FacebookConfig = {
    appId: '397717897310650',
    version: 'v2.9'
  };

  public aws: AwsConfig = {
    region: 'us-east-1',
    identityPoolId: 'us-east-1:1bf97fba-e8be-4650-8305-83b9467b2eb5'
  };

  public api: ApiConfig = {
    baseUrl: 'https://camview.balassy.me/api'
  };
}
