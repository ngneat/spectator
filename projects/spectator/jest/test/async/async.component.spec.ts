import { createHostFactory, SpectatorHost } from '@netbasal/spectator/jest';

import { AsyncComponent } from '../../../test/async/async.component';
import { QueryService } from '../../../test/query.service';

describe('ZippyComponent', () => {
  let host: SpectatorHost<AsyncComponent>;

  const createHost = createHostFactory({
    component: AsyncComponent,
    mocks: [QueryService]
  });

  it('should work', () => {
    const { component } = createHost(`<app-async></app-async>`);
    expect(component).toBeDefined();
  });

  it('should be falsy', () => {
    host = createHost(`<app-async></app-async>`);
    expect(host.query('p')).not.toExist();
  });

  // it('should be truthy', () => {
  //   const host = createHost(`<app-async></app-async>`, { detectChanges: false });
  //   const queryService = host.get(QueryService);
  //   queryService.select.mockReturnValue(of(true));
  //   host.detectChanges();
  //   expect(host.query('p')).toExist();
  // });
});
