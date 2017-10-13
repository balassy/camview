import { Component } from '@angular/core';
import { FacebookClientService } from '../services/facebook-client/facebook-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private _facebookClientService: FacebookClientService) {
    this._facebookClientService.init();
  }
}
