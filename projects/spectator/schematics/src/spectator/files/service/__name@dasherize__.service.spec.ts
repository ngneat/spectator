import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';
import { createService } from '@netbasal/spectator';

describe('<%= classify(name)%>Service Without Mock', () => {
  const spectator = createService(<%= classify(name)%>Service);
  // const spectator = createService({ service: <%= classify(name)%>Service, mocks: [OtherService] });

  it('should be 0', () => {
    expect(spectator.service.counter).toEqual(0);
  });

});
