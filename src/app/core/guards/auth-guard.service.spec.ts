import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthGuardService]

    });
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
