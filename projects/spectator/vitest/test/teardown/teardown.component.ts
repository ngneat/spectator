import { Component, Input, OnDestroy } from '@angular/core';

import { TeardownError } from './error';
import { TeardownService } from './teardown.service';

@Component({
  selector: 'app-teardown',
  template: '',
  standalone: false,
})
export class TeardownComponent implements OnDestroy {
  @Input()
  rethrowErrors = false;

  constructor(readonly teardownService: TeardownService) {}

  ngOnDestroy(): void {
    if (this.rethrowErrors) {
      throw new TeardownError();
    }
  }
}
