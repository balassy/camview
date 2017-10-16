import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { MockComponent } from 'ng2-mock-component';

import { NavbarComponent } from './navbar.component';
import { AuthService } from './../../services/auth/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockAuthService: AuthService = mock(AuthService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        MockComponent({ selector: 'mat-icon' }),
        MockComponent({ selector: 'mat-toolbar' })
      ],
      providers: [
        { provide: AuthService, useFactory: () => instance(mockAuthService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
