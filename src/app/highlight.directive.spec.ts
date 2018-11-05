import { createHostComponentFactory, SpectatorWithHost } from '../../projects/spectator/src/lib/host';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', function() {
  let host: SpectatorWithHost<HighlightDirective>;

  const createHost = createHostComponentFactory(HighlightDirective);

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
