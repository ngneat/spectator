import { createServiceFactory, mockProvider } from '@ngneat/spectator';
import { Subject } from 'rxjs';

import { NgOnDestroyService, SubjectService } from './ng-on-destroy.service';

describe('NgOnDestroyService', () => {
  const subjectAcrossMultipleTests$ = new Subject<string>();

  const createService = createServiceFactory({
    service: NgOnDestroyService,
    providers: [
      mockProvider(SubjectService, {
        subject: subjectAcrossMultipleTests$,
      }),
    ],
  });

  it('should subscribe to subject during', () => {
    const spectator = createService();

    expect(spectator.service).toBeTruthy();
    expect(subjectAcrossMultipleTests$.observers.length).toBe(1);
  });

  it('should call spy only once on because previous were unsubscribe in ngOnDestroy', () => {
    const spectator = createService();

    expect(spectator.service).toBeTruthy();
    expect(subjectAcrossMultipleTests$.observers.length).toBe(1);
  });
});
