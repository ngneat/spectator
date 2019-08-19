import { createHostFactory, SpectatorWithHost } from '@netbasal/spectator';

import { AppUnlessDirective } from './unless.component';

describe('HelloComponent', () => {
  let host: SpectatorWithHost<AppUnlessDirective>;

  const createHost = createHostFactory(AppUnlessDirective);

  it('should work', () => {
    host = createHost(`<div *appUnless="false">Hello world</div>`);
    expect(host.hostElement).toHaveText('Hello world');
  });

  it('should work', () => {
    host = createHost(`<div *appUnless="true">Hello world</div>`);
    expect(host.hostElement).not.toHaveText('Hello world');
  });

  it('should use hostElement when using query to find element', () => {
    host = createHost(`<div *appUnless="true">Hello world</div>`);
    expect(host.query('div')).not.toHaveText('Hello world');
  });
});
