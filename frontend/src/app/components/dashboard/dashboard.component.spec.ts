import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';
import { instance, mock } from 'ts-mockito';

import { DashboardComponent } from './dashboard.component';
import { ApiClientService } from './../../services/api-client/api-client.service';
import { ProgressService } from './../../services/progress/progress.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockApiClientService: ApiClientService = mock(ApiClientService);
  const mockProgressService: ProgressService = mock(ProgressService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent({ selector: 'app-cam-info' }),
      ],
      providers: [
        { provide: ApiClientService, useFactory: () => instance(mockApiClientService) },
        { provide: ProgressService, useFactory: () => instance(mockProgressService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
