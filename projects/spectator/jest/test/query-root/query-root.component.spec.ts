import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { QueryRootComponent, QueryRootOverlayComponent } from '../../../test/query-root/query-root.component';

describe('QueryRootComponent', () => {
  let spectator: Spectator<QueryRootComponent>;
  const createComponent = createComponentFactory(QueryRootComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should allow querying one by directive', () => {
    spectator.component.openOverlay();

    const component = spectator.query(QueryRootOverlayComponent, { root: true });
    expect(component?.title).toBe('Query Root Overlay');
  });

  it('should allow querying last by directive', () => {
    spectator.component.openOverlay();

    const component = spectator.queryLast(QueryRootOverlayComponent, { root: true });
    expect(component?.title).toBe('Query Root Overlay');
  });

  it('should allow querying all by directive', () => {
    spectator.component.openOverlay();

    const components = spectator.queryAll(QueryRootOverlayComponent, { root: true });
    expect(components.length).toBe(1);
    expect(components[0].title).toBe('Query Root Overlay');
  });
});
