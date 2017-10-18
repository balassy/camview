import { TestBed } from '@angular/core/testing';
import * as Chance from 'chance';

import { ProgressService } from './progress.service';
import { ProgressState, ProgressStatus } from './progress.types';

const chance: Chance.Chance = new Chance();

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressService]
    });
    service = TestBed.get(ProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('start function', () => {
    it('should notify subscribers', () => {
      const testMessage: string = chance.sentence();
      service.start(testMessage);
      service.onStateChanged.subscribe((newState: ProgressState) => {
        expect(newState.message).toEqual(testMessage);
        expect(newState.status).toEqual(ProgressStatus.Working);
      });
    });
  });

  describe('end function', () => {
    it('should notify subscribers', () => {
      service.end();
      service.onStateChanged.subscribe((newState: ProgressState) => {
        expect(newState.status).toEqual(ProgressStatus.Idle);
      });
    });
  });
});
