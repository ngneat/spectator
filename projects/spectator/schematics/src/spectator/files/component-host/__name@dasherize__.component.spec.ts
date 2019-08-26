import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';

describe('<%= classify(name)%>Component', () => {
  let spectator: SpectatorHost<<%= classify(name)%>Component>;

  const createHost = createHostFactory(<%= classify(name)%>Component);

  it('should create', () => {
    spectator = createHost(`<zippy title="Zippy title"></zippy>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should...', () => {
    spectator = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);
    spectator.click('.zippy__title');
    expect(spectator.query('.arrow')).toHaveText('Close');
  });

  it('should...', () => {
    spectator = createHost(`<zippy title="Zippy title"></zippy>`);
    spectator.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();
    spectator.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

});
