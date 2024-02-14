import { fakeAsync } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { AsyncInputComponent } from '../../../test/async-input/async-input.component';

describe('ZippyComponent', () => {
  let host: SpectatorHost<AsyncInputComponent>;

  const createHost = createHostFactory(AsyncInputComponent);

  it('should work', () => {
    const { component } = createHost(`<app-async-input></app-async-input>`);
    expect(component).toBeDefined();
  });

  it('should not be visible', () => {
    host = createHost(`<app-async-input></app-async-input>`);
    host.setHostInput('widgets', '');
    expect(host.query('div')).not.toExist();
  });

  it('should be visible', fakeAsync(() => {
    host = createHost(`<app-async-input [widgets]="widgets"></app-async-input>`, {
      detectChanges: true,
      hostProps: {
        widgets: '',
      },
    });
    host.tick();
    host.detectChanges();
    expect(host.query('div')).toExist();
  }));
});
