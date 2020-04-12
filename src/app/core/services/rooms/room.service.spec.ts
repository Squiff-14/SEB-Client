import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomService } from './room.service';

describe('Service: Room', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RoomService
      ]
    });
  });

  it('should ...', inject([RoomService], (service: RoomService) => {
    expect(service).toBeTruthy();
  }));
});
