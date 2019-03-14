import { NgOnDestroyService, ngOnDestroySpy } from './ng-on-destroy.service';
import { SubjectService } from './subject.service';
import { createService } from '@netbasal/spectator';
import { mockProvider } from '@netbasal/spectator/jest';
import { Subject } from 'rxjs';

describe('NgOnDestroyService', () => {
  const spyAcrossMultipleTests = jasmine.createSpy('ngOnDestroy test spy');
  const subjectAcrossMultipleTests$ = new Subject();
  const spectator = createService({
    service: NgOnDestroyService,
    providers: [
      {
        provide: ngOnDestroySpy,
        useValue: spyAcrossMultipleTests
      },
      mockProvider(SubjectService, {
        subject$: subjectAcrossMultipleTests$
      })
    ]
  });

  /**
   * !! The order of tests depends here !!
   */
  it('should subscribe to subject during', () => {
    const service: NgOnDestroyService = spectator.service;
    expect(service).toBeTruthy();
    expect(subjectAcrossMultipleTests$.observers.length).toBe(1);
  });

  it('should call spy only once on because previous were unsubscribe in ngOnDestroy', () => {
    const service: NgOnDestroyService = spectator.service;
    expect(subjectAcrossMultipleTests$.observers.length).toBe(1);
  });
});
