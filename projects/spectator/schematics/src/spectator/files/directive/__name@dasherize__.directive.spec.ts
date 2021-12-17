import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';

import { <%= classify(name)%>Directive } from './<%= dasherize(name)%>.directive';

describe('<%= classify(name)%>Directive', () => {
  let spectator: SpectatorDirective<<%= classify(name)%>Directive>;
  const createDirective = createDirectiveFactory(<%= classify(name)%>Directive);

  it('should change the background color', () => {
    spectator = createDirective(`<div highlight>Testing <%= classify(name)%>Directive</div>`);

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)'
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff'
    });
  });

});
