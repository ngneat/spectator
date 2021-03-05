import { createHostFactory, SpectatorHost } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';

import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';

describe('<%= classify(name)%>Component', () => {
  let spectator: SpectatorHost<<%= classify(name)%>Component>;

  const createHost = createHostFactory(<%= classify(name)%>Component);

  beforeEach(() => {
    spectator = createHost(`<app-<%= dasherize(name)%> title="Zippy title">Zippy content</app-<%= dasherize(name)%>>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should...', () => {
    spectator.click('.zippy__title');
    expect(spectator.query('.arrow')).toHaveText('Close');
  });

  it('should...', () => {
    spectator.click('.zippy__title');
    expect(spectator.query('.zippy__content')).toExist();
    spectator.click('.zippy__title');
    expect('.zippy__content').not.toExist();
  });

});
