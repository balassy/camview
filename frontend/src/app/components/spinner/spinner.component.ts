import { Component, Inject, OnInit } from '@angular/core';

import { ProgressService } from '../../services/progress/progress.service';
import { ProgressState, ProgressStatus } from '../../services/progress/progress.types';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public message?: string = "Please wait...";
  public show: boolean = false;

  constructor(@Inject(ProgressService) private _progressService: ProgressService) {
  }

  ngOnInit() {
    this._progressService.onStateChanged.subscribe(this._onProgressStateChanged.bind(this));
  }

  private _onProgressStateChanged(newState: ProgressState): void {
    this.show = newState.status === ProgressStatus.Working;
    this.message = newState.message;
  }
}
