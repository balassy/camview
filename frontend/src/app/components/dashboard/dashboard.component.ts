import { Component, Inject, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { ProgressService } from '../../services/progress/progress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public constructor(@Inject(ApiClientService) private _apiClientService: ApiClientService,
                     @Inject(ProgressService) private _progressService: ProgressService) {
  }

  public ngOnInit(): void {
  }

  public onHealthCheckButtonClicked(): void {
    this._progressService.start();
    this._apiClientService.getHealthCheck()
      .then(result => {
        console.log('Health Check result', result);
        this._progressService.end();
      });
  }

  public onDetailedHealthCheckButtonClicked(): void {
    this._progressService.start();
    this._apiClientService.getHealthCheckDetailed()
      .then(result => {
        console.log('Detailed Health Check result', result);
        this._progressService.end();
      });
  }
}
