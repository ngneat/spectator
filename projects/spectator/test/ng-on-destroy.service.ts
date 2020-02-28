import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  public subject = new Subject<string>();
}

@Injectable({ providedIn: 'root' })
export class NgOnDestroyService implements OnDestroy {
  private readonly subscription: Subscription;

  constructor(private readonly subjectService: SubjectService) {
    this.subscription = this.subjectService.subject.subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
