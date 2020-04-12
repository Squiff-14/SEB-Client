import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ImageService } from './image.service';

describe('Service: Image', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ImageService
      ]
    });
  });

  it('should ...', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
