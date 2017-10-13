import { Component, Inject } from '@angular/core';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { GetHealthCheckDetailedResult, GetHealthCheckResult } from '../../services/api-client/api-client.types';
import { ProgressService } from '../../services/progress/progress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public constructor(@Inject(ApiClientService) private _apiClientService: ApiClientService,
                     @Inject(ProgressService) private _progressService: ProgressService) {
  }

  public onHealthCheckButtonClicked(): Promise<void> {
    this._progressService.start();
    return this._apiClientService.getHealthCheck()
      .then((result: GetHealthCheckResult) => {
        console.log('Health Check result', result);
        this._progressService.end();
      });
  }

  public onDetailedHealthCheckButtonClicked(): Promise<void> {
    this._progressService.start();
    return this._apiClientService.getHealthCheckDetailed()
      .then((result: GetHealthCheckDetailedResult) => {
        console.log('Detailed Health Check result', result);
        this._progressService.end();
      });
  }
}
