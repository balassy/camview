import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public constructor(@Inject(AuthService) private _authService: AuthService) {
  }

  public ngOnInit(): void {
  }

  public onLoginButtonClicked(): void {
    this._authService.login()
      .then((response) => {
        return this._authService.redirectToHome();
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
}
