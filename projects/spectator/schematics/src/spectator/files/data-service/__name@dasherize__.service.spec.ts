import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';

describe('<%= classify(name)%>Service', () => {
  let spectator: SpectatorHttp<<%= classify(name)%>Service>;
  const createHttp = createHttpFactory(<%= classify(name)%>Service);

  beforeEach(() => spectator = createHttp());

 it('can test HttpClient.get', () => {
    // spectator.service.getTodos().subscribe();
    // spectator.expectOne('api/todos', HttpMethod.GET);
  });
});
