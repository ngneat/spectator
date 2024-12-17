import { createHostFactory, SpectatorHost } from '@ngneat/spectator/vitest';

import { AsyncComponent } from '../../../test/async/async.component';
import { QueryService } from '../../../test/query.service';

describe('ZippyComponent', () => {
  let host: SpectatorHost<AsyncComponent>;

  const createHost = createHostFactory({
    component: AsyncComponent,
    mocks: [QueryService],
  });

  it('should work', () => {
    const { component } = createHost(`<app-async></app-async>`);
    expect(component).toBeDefined();
  });

  it('should be falsy', () => {
    host = createHost(`<app-async></app-async>`);
    expect(host.query('p')).not.toExist();
  });
});
