import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ProgressState, ProgressStatus } from './progress.types';

@Injectable()
export class ProgressService {
  private _onStateChangedSubject: BehaviorSubject<ProgressState> = new BehaviorSubject({status: ProgressStatus.Idle});
  public readonly onStateChanged: Observable<ProgressState> = this._onStateChangedSubject.asObservable();

  public start(message?: string): void {
    this._notifyStateChanged({
      message,
      status: ProgressStatus.Working
    });
  }

  public end(): void {
    this._notifyStateChanged({
      status: ProgressStatus.Idle
    });
  }

  private _notifyStateChanged(newState: ProgressState): void {
    this._onStateChangedSubject.next(newState);
  }
}
