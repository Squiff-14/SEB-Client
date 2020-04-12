import { AuthService } from './../authentication/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('Service: Message', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MessageService
      ]
    });
  });

  it('should ...', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
