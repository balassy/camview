import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { Observable } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { SpinnerComponent } from './spinner.component';
import { ProgressService } from './../../services/progress/progress.service';
import { ProgressStatus } from './../../services/progress/progress.types';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  const mockProgressService: ProgressService = mock(ProgressService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinnerComponent,
        MockComponent({ selector: 'mat-progress-spinner' }),
      ],
      providers: [
        { provide: ProgressService, useFactory: () => instance(mockProgressService) }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    when(mockProgressService.onStateChanged).thenReturn(Observable.of({ status: ProgressStatus.Idle }));
    expect(component).toBeTruthy();
  });
});
