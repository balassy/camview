import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Chance } from 'chance';
import { instance, mock, reset, verify, when } from 'ts-mockito';

import { CamInfoComponent } from './cam-info.component';
import { ApiClientService } from './../../../services/api-client/api-client.service';
import { GetDeviceInfoResult } from './../../../services/api-client/api-client.types';

// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)

const chance: Chance.Chance = new Chance();

describe('CamInfoComponent', () => {
  let component: CamInfoComponent;
  let fixture: ComponentFixture<CamInfoComponent>;
  const mockApiClientService: ApiClientService = mock(ApiClientService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamInfoComponent ],
      providers: [
        { provide: ApiClientService, useFactory: () => instance(mockApiClientService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initialization', () => {
    let testApiError: {
      code: string;
      description: string;
    };
    let testDeviceInfo: GetDeviceInfoResult;

    beforeEach(() => {
      reset(mockApiClientService);

      testApiError = {
        code: chance.word(),
        description: chance.sentence()
      };

      testDeviceInfo = {
        mac: chance.word(),
        name: chance.word()
      };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display a loading message by default', () => {
      expect(component.vm.cameraName).toContain('Loading');
    });

    it('should retrieve the device info', async () => {
      when(mockApiClientService.getDeviceInfo()).thenReturn(Promise.resolve<GetDeviceInfoResult>(testDeviceInfo));
      await component.ngOnInit();
      verify(mockApiClientService.getDeviceInfo()).once();
    });

    it('should display the device name on success', async () => {
      when(mockApiClientService.getDeviceInfo()).thenReturn(Promise.resolve<GetDeviceInfoResult>(testDeviceInfo));
      await component.ngOnInit();
      expect(component.vm.cameraName).toEqual(testDeviceInfo.name);
    });

    it('should display error message on failure', async () => {
      when(mockApiClientService.getDeviceInfo()).thenReturn(Promise.reject(testApiError));
      await component.ngOnInit();
      expect(component.vm.cameraName).toContain(testApiError.description);
    });
  });
});
