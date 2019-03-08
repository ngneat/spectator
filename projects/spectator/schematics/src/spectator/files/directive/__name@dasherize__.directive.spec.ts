import { <%= classify(name)%>Directive } from './<%= dasherize(name)%>.directive';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';

describe('<%= classify(name)%>Directive ', () => {
  let host: SpectatorWithHost<<%= classify(name)%>Directive>;

  const createHost = createHostComponentFactory(<%= classify(name)%>Directive);

  it('should change the background color', () => {
    host = createHost(`<div highlight>Testing <%= classify(name)%>Directive</div>`);

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
