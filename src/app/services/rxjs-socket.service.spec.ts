import { TestBed } from '@angular/core/testing';

import { RxjsSocketService } from './rxjs-socket.service';

describe('RxjsSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxjsSocketService = TestBed.get(RxjsSocketService);
    expect(service).toBeTruthy();
  });
});
