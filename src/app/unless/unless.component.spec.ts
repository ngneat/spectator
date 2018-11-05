import { createHostComponentFactory, SpectatorWithHost } from '../../../projects/spectator/src/lib/host';

import { AppUnlessDirective } from './unless.component';

describe('HelloComponent', () => {
  let host: SpectatorWithHost<AppUnlessDirective>;

  const createHost = createHostComponentFactory({
    component: AppUnlessDirective
  });

  it('should work', () => {
    host = createHost(`<div *appUnless="false">Hello world</div>`);
    expect(host.hostElement).toHaveText('Hello world');
  });

  it('should work', () => {
    host = createHost(`<div *appUnless="true">Hello world</div>`);
    expect(host.hostElement).not.toHaveText('Hello world');
  });
});
