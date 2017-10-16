import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { LoginComponent } from './login.component';
import { AuthService } from './../../services/auth/auth.service';
import { ProgressService } from './../../services/progress/progress.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthService: AuthService = mock(AuthService);
  const mockProgressService: ProgressService = mock(ProgressService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useFactory: () => instance(mockAuthService) },
        { provide: ProgressService, useFactory: () => instance(mockProgressService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
