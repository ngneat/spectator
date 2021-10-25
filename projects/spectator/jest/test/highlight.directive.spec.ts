import { createDirectiveFactory, SpectatorDirective, SpectatorHost } from '@ngneat/spectator';
import { createHostFactory } from '@ngneat/spectator/jest';

import { HighlightDirective } from '../../test/highlight.directive';

describe('HighlightDirective', () => {
  let host: SpectatorHost<HighlightDirective>;

  const createHost = createHostFactory(HighlightDirective);

  // calculated styles not supported in JSDOM
  it('should change the background color', () => {
    host = createHost(`<div highlight>Testing HighlightDirective</div>`);

    host.dispatchMouseEvent(host.element, 'mouseover');

    expect(host.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    host.dispatchMouseEvent(host.element, 'mouseout');
    expect(host.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });
});

describe('HighlightDirective (createHostDirectiveFactory)', () => {
  let host: SpectatorDirective<HighlightDirective>;

  const createHost = createDirectiveFactory(HighlightDirective);

  // calculated styles not supported in JSDOM
  it('should change the background color', () => {
    host = createHost(`<div highlight>Testing HighlightDirective</div>`);

    host.dispatchMouseEvent(host.element, 'mouseover');

    expect(host.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    host.dispatchMouseEvent(host.element, 'mouseout');
    expect(host.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });
});
