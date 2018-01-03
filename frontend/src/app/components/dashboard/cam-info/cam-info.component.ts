import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../services/api-client/api-client.service';
import { GetDeviceInfoResult } from '../../../services/api-client/api-client.types';

@Component({
  selector: 'app-cam-info',
  templateUrl: './cam-info.component.html',
  styleUrls: ['./cam-info.component.css']
})
export class CamInfoComponent implements OnInit {
  public vm = {
    cameraName: '(Loading, please wait...)'
  };

  public constructor(private _apiClient: ApiClientService) {
  }

  public async ngOnInit() {
    try {
      const deviceInfo: GetDeviceInfoResult = await this._apiClient.getDeviceInfo();
      this.vm.cameraName = deviceInfo.name;
    } catch (err) {
      this.vm.cameraName = `(${err.description})`;
    }
  }
}
