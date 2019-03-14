import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class NgOnDestroyService implements OnDestroy {
  subscription: Subscription;

  constructor(private subjectService: SubjectService) {
    this.subscription = this.subjectService.subject$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
