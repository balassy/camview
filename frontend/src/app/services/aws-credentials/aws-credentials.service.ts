import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

import { CurrentUser } from './../auth/auth.service';
import { ConfigService } from './../config/config.service';
import { ProgressService } from './../progress/progress.service';

@Injectable()
export class AwsCredentialsService {
  public get currentCredentials(): AWS.CognitoIdentityCredentials {
    return this._currentCredentials;
  }

  private get _currentCredentials(): AWS.CognitoIdentityCredentials {
    return AWS.config.credentials as AWS.CognitoIdentityCredentials
  }

  private set _currentCredentials(value: AWS.CognitoIdentityCredentials) {
    AWS.config.credentials = value;
  }

  constructor(private _configService: ConfigService,
              private _progressService: ProgressService) {
  }

  public update(currentUser: CurrentUser | null): Promise<void> {
    AWS.config.region = this._configService.aws.region;
    return currentUser
      ? this._getCredentials(currentUser.facebookAccessToken)
      : this._clearCredentials();
  }

  private _getCredentials(facebookAccessToken: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._progressService.start('Getting your AWS credentials...');
      this._currentCredentials = this._createAuthenticatedCredentials(facebookAccessToken);
      this._currentCredentials.get((err) => {
        if (err) {
          console.error('AwsCredentialsService: Cognito get error:', err);
          reject(err);
        }
        this._progressService.end();
        resolve();
      });
    });
  }

  private _clearCredentials(): Promise<void> {
    if (this._currentCredentials) {
      this._currentCredentials.clearCachedId();
      this._currentCredentials = this._createUnauthenticatedCredentials()
    }

    return Promise.resolve();
  }

  private _createAuthenticatedCredentials(facebookAccessToken: string): AWS.CognitoIdentityCredentials {
    if (!facebookAccessToken) {
      throw new Error('Please specify the facebookAccessToken when creating new authenticated credentials!');
    }
    return this._createCredentials(facebookAccessToken);
  }

  private _createUnauthenticatedCredentials(): AWS.CognitoIdentityCredentials {
    return this._createCredentials();
  }

  private _createCredentials(facebookAccessToken?: string): AWS.CognitoIdentityCredentials {
    const options: AWS.CognitoIdentityCredentials.CognitoIdentityOptions = {
      IdentityPoolId: this._configService.aws.identityPoolId
    };

    if (facebookAccessToken) {
      options.Logins = {
        'graph.facebook.com': facebookAccessToken
      }
    }
    return new AWS.CognitoIdentityCredentials(options);
  }
}
