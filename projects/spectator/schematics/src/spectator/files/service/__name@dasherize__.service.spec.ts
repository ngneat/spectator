import { createServiceFactory, SpectatorService } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';

describe('<%= classify(name)%>Service', () => {
  let spectator: SpectatorService<<%= classify(name)%>Service>;
  const createService = createServiceFactory(<%= classify(name)%>Service);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});