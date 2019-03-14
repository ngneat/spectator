import { TestBed } from '@angular/core/testing';

import { SubjectService } from './subject.service';
import { createService } from '@netbasal/spectator';

describe('SubjectService', () => {
  const spectator = createService(SubjectService);

  it('should be created', () => {
    const service: SubjectService = spectator.service;
    expect(service).toBeTruthy();
  });
});
