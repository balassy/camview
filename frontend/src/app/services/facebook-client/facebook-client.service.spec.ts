import { TestBed, inject } from '@angular/core/testing';
import { FacebookService } from 'ngx-facebook';

import { ConfigService } from './../config/config.service';
import { FacebookClientService } from './facebook-client.service';

describe('FacebookClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        FacebookClientService,
        FacebookService,
      ]
    });
  });

  it('should be created', inject([FacebookClientService], (service: FacebookClientService) => {
    expect(service).toBeTruthy();
  }));
});
