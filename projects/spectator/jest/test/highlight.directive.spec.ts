import { SpectatorWithHost } from '@netbasal/spectator';
import { createHostComponentFactory } from '@netbasal/spectator/jest';

import { HighlightDirective } from '../../test/highlight.directive';

describe('HighlightDirective', () => {
  let host: SpectatorWithHost<HighlightDirective>;

  const createHost = createHostComponentFactory(HighlightDirective);

  // calculated styles not supported in JSDOM
  xit('should change the background color', () => {
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
