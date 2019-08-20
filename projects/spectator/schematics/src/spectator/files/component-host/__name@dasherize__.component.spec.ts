import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { createHostComponentFactory, SpectatorWithHost } from '@ngneat/spectator';

describe('<%= classify(name)%>Component', () => {
  let host: SpectatorWithHost<<%= classify(name)%>Component>;
  const createHost = createHostComponentFactory(<%= classify(name)%>Component);

  it('should create', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);
    expect(host.component).toBeTruthy();
  });

  it('should...', () => {
      host = createHost(`<zippy title="Zippy title">Zippy content</zippy>`);
      host.click('.zippy__title');
      expect(host.query('.arrow')).toHaveText('Close');
  });

  it('should...', () => {
    host = createHost(`<zippy title="Zippy title"></zippy>`);
    host.click('.zippy__title');
    expect(host.query('.zippy__content')).toExist();
    host.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

});
