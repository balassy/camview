import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private _authService: AuthService) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.isLoggedIn()
      .then((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this._authService.redirectToLogin();
        }
        return isLoggedIn;
      });
  }
}
