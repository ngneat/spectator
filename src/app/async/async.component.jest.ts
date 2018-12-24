import { of } from 'rxjs';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator/jest';
import { QueryService } from '../query.service';
import { AsyncComponent } from './async.component';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<AsyncComponent>;

  const createHost = createHostComponentFactory({
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

  it('should be truthy', () => {
    const host = createHost(`<app-async></app-async>`, false);
    let queryService = host.get<QueryService>(QueryService);
    queryService.select.mockReturnValue(of(true));
    host.detectChanges();
    expect(host.query('p')).toExist();
  });
});
