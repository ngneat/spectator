import { inject, TestBed } from '@angular/core/testing';

import { ChildServiceService } from './child-service.service';

describe('ChildServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildServiceService],
    });
  });

  it('should be created', inject([ChildServiceService], (service: ChildServiceService) => {
    expect(service).toBeTruthy();
  }));
});
