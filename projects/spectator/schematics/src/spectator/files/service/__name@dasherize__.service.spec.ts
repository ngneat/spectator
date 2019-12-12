import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';

describe('<%= classify(name)%>Service', () => {
  let spectator: SpectatorService<<%= classify(name)%>Service>;
  const createService = createServiceFactory(<%= classify(name)%>Service);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeFalsy();
  });
});