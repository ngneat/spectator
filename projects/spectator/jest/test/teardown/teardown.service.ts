import { Injectable, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TeardownService implements OnDestroy {
  ngOnDestroy(): void {}
}
