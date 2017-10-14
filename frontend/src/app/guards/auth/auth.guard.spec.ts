import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { AuthGuard } from './auth.guard';
import { AuthService } from './../../services/auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockAuthService: AuthService = mock(AuthService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useFactory: () => instance(mockAuthService) }
      ]
    });

    guard = TestBed.get(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
