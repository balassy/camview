import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

import { AuthService, CurrentUser } from './../auth/auth.service';
import { ConfigService } from './../config/config.service';

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

  constructor(private _authService: AuthService, private _configService: ConfigService) {
  }

  public init(): void {
    AWS.config.region = this._configService.aws.region;
    this._authService.onCurrentUserChanged.subscribe(this._onCurrentUserChanged.bind(this));
  }

  private _onCurrentUserChanged(currentUser: CurrentUser | null) {
    if (currentUser) {
      this._getCredentials(currentUser.facebookAccessToken);
    } else {
      this._clearCredentials();
    }
  }

  private _getCredentials(facebookAccessToken: string) {
    this._currentCredentials = this._createAuthenticatedCredentials(facebookAccessToken);
    this._currentCredentials.get((err) => {
      if (err) {
        console.error('AwsCredentialsService: Cognito get error:', err);
      }
    });
  }

  private _clearCredentials() {
    if (this._currentCredentials) {
      this._currentCredentials.clearCachedId();
      this._currentCredentials = this._createUnauthenticatedCredentials()
    }
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
