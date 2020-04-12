import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WebSocketService } from './web-socket.service';


import { TestBed, async, inject } from '@angular/core/testing';

describe('Service: WebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WebSocketService
      ]
    });
  });

  it('should ...', inject([WebSocketService], (service: WebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
