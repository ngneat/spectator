import { fakeAsync } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { AsyncInputComponent } from './async-input.component';

describe('ZippyComponent', () => {
  let host: SpectatorHost<AsyncInputComponent>;

  const createHost = createHostFactory(AsyncInputComponent);

  it('should work', () => {
    const { component } = createHost(`<app-async-input></app-async-input>`);
    expect(component).toBeDefined();
  });

  it('should not be visible', () => {
    host = createHost(`<app-async-input></app-async-input>`);
    host.setInput('widgets', '');
    expect(host.query('div')).not.toExist();
  });

  it('should be visible', fakeAsync(() => {
    host = createHost(`<app-async-input></app-async-input>`, {
      detectChanges: true,
      props: {
        widgets: '',
      },
    });
    host.tick();
    host.detectChanges();
    expect(host.query('div')).toExist();
  }));
});
