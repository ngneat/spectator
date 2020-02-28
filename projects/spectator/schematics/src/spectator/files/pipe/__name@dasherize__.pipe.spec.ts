import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';

import { <%= classify(name)%>Pipe } from './<%= dasherize(name)%>.pipe';

describe('<%= classify(name)%>Pipe ', () => {
  let spectator: SpectatorPipe<<%= classify(name)%>Pipe>;
  const createPipe = createPipeFactory(<%= classify(name)%>Pipe);

  it('should change the background color', () => {
    spectator = createPipe(`<div>{{ 'Testing' | <%= camelize(name)%> }}</div>`);

    expect(spectator.element).toHaveText('Testing');
  });
});
