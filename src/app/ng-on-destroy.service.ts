import { Injectable, OnDestroy, Inject, InjectionToken } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectService } from './subject.service';

export const ngOnDestroySpy = new InjectionToken('ngOnDestroy Spy');

@Injectable({
  providedIn: 'root'
})
export class NgOnDestroyService implements OnDestroy {
  subscription: Subscription;

  constructor(private subjectService: SubjectService, @Inject(ngOnDestroySpy) private spy: jasmine.Spy) {
    this.subscription = this.subjectService.subject$.subscribe(() => {
      this.spy();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
