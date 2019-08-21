import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  public subject = new Subject();
}

@Injectable({ providedIn: 'root' })
export class NgOnDestroyService implements OnDestroy {
  private subscription: Subscription;

  constructor(private subjectService: SubjectService) {
    this.subscription = this.subjectService.subject.subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
