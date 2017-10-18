import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService, CurrentUser } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public vm: {
    isLoggedIn: boolean;
    displayName: string | null;
  };

  private _onCurrentUserChangedSubscription: Subscription;

  public constructor(@Inject(AuthService) private _authService: AuthService) {
  }

  public ngOnInit(): void {
    this._onCurrentUserChangedSubscription = this._authService.onCurrentUserChanged.subscribe(this._onCurrentUserChanged.bind(this));
  }

  public onLogoutButtonClicked(): void {
    this._authService.logout()
      .then(() =>
        this._authService.redirectToLogin()
      )
      .catch((err) => {
        console.error('error', err);
      });
  }

  private _onCurrentUserChanged(currentUser: CurrentUser | null) {
    this.vm = currentUser
      ? {
        displayName: currentUser.name,
        isLoggedIn: true
      }
      : {
        displayName: null,
        isLoggedIn: false
      };

    if (currentUser) {
      this.vm = {
        displayName: currentUser.firstName,
        isLoggedIn: true
      };
    }
  }
}
