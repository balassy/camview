import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { instance, mock, reset, verify } from 'ts-mockito';

import { AppComponent } from './app.component';
import { FacebookClientService } from './../services/facebook-client/facebook-client.service';

describe('AppComponent', () => {
  const mockFacebookClientService: FacebookClientService = mock(FacebookClientService);
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-navbar' }),
        MockComponent({ selector: 'app-spinner' })
      ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: FacebookClientService, useFactory: () => instance(mockFacebookClientService) }
      ],
    })
    .compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  afterEach(() => {
    reset(mockFacebookClientService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the Facebook client', () => {
    verify(mockFacebookClientService.init()).once();
  });
});
