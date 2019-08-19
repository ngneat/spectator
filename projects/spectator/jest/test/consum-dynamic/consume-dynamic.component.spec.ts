import { createHostFactory, SpectatorHost } from '@netbasal/spectator/jest';

import { ConsumeDynamicComponent } from '../../../test/consum-dynamic/consume-dynamic.component';
import { DynamicComponent } from '../../../test/dynamic/dynamic.component';

describe('ConsumeDynamicComponent', () => {
  let host: SpectatorHost<ConsumeDynamicComponent>;

  const createHost = createHostFactory({
    declarations: [DynamicComponent],
    entryComponents: [DynamicComponent],
    component: ConsumeDynamicComponent
  });

  it('should work', () => {
    host = createHost(`<app-consume-dynamic></app-consume-dynamic>`);
    expect(host.component).toBeDefined();
  });

  it('should render the dynamic component', () => {
    host = createHost(`<app-consume-dynamic></app-consume-dynamic>`);
    expect(host.queryHost('.dynamic')).toHaveText('dynamic works!');
  });
});
