import { Component, Inject } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { ProgressService } from '../../services/progress/progress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public constructor(@Inject(AuthService) private _authService: AuthService,
                     @Inject(ProgressService) private _progressService: ProgressService) {
  }

  public onLoginButtonClicked(): void {
    this._progressService.start('Please log in to Facebook...');
    this._authService.login()
      .then((response) => {
        this._progressService.end();
        return this._authService.redirectToHome();
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
}
