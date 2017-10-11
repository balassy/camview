import { Component } from '@angular/core';
import { AwsCredentialsService } from '../services/aws-credentials/aws-credentials.service';
import { FacebookClientService } from '../services/facebook-client/facebook-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private _facebookClientService: FacebookClientService,
                     private _awsCredentialsService: AwsCredentialsService) {
    this._facebookClientService.init();
    this._awsCredentialsService.init();
  }
}
