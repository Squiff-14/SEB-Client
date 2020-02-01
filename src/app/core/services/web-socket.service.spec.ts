import { WebSocketService } from './web-socket.service';


import { TestBed, async, inject } from '@angular/core/testing';

describe('Service: WebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService]
    });
  });

  it('should ...', inject([WebSocketService], (service: WebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
