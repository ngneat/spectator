import { Spectator, createComponentFactory } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';

import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';

describe('<%= classify(name)%>Component', () => {
  let spectator: Spectator<<%= classify(name)%>Component>;
  const createComponent = createComponentFactory(<%= classify(name)%>Component);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
