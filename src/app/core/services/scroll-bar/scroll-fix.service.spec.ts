/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScrollFixService } from './scroll-fix.service';

describe('Service: ScrollFix', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollFixService]
    });
  });

  it('should ...', inject([ScrollFixService], (service: ScrollFixService) => {
    expect(service).toBeTruthy();
  }));
});
