import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { FacebookClientService, LoginResponse, LoginStatus } from '../facebook-client/facebook-client.service';
import { AwsCredentialsService } from '../aws-credentials/aws-credentials.service';

import { CurrentUser } from './models/current-user';
export { CurrentUser } from './models/current-user';
import { FacebookGetProfileResponse } from './auth.types';

@Injectable()
export class AuthService {
  private _onCurrentUserChangedSubject: BehaviorSubject<CurrentUser | null> = new BehaviorSubject<CurrentUser | null>(null);
  public readonly onCurrentUserChanged: Observable<CurrentUser | null> = this._onCurrentUserChangedSubject.asObservable();

  public constructor(private _awsCredentialsService: AwsCredentialsService,
                     private _facebookClientService: FacebookClientService,
                     private _router: Router) {
  }

  public login(): Promise<CurrentUser> {
    let facebookAccessToken: string;
    let currentUser: CurrentUser;

    return this._facebookClientService.login()
      .then((res: LoginResponse) => {
        facebookAccessToken = res.authResponse.accessToken;
        return this._facebookClientService.api('/me?fields=first_name, name');
      })
      .then((facebookProfile: FacebookGetProfileResponse) => {
        currentUser = new CurrentUser(facebookProfile.id, facebookProfile.name, facebookProfile.first_name, facebookAccessToken);
        return this._awsCredentialsService.update(currentUser);
      })
      .then(() => {
        this._notifyCurrentUserChanged(currentUser);
        return currentUser;
      });
  }

  public logout(): Promise<void> {
    const newUser: null = null;

    return this._facebookClientService.logout()
      .then(() =>
        this._awsCredentialsService.update(newUser)
      )
      .then(() => {
        this._notifyCurrentUserChanged(newUser);
      });
  }

  public isLoggedIn(): Promise<boolean> {
    return this._facebookClientService.getLoginStatus()
      .then((loginStatus: LoginStatus) => {
        const isLoggedIn: boolean = loginStatus.status === 'connected';
        if (!isLoggedIn) {
          this._notifyCurrentUserChanged(null);
        }
        return isLoggedIn;
      });
  }

  public redirectToHome(): Promise<boolean> {
    return this._router.navigate(['/dashboard']);
  }

  public redirectToLogin(): Promise<boolean> {
    return this._router.navigate(['/login']);
  }

  private _notifyCurrentUserChanged(newCurrentUser: CurrentUser | null): void {
    this._onCurrentUserChangedSubject.next(newCurrentUser);
  }
}
