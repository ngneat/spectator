import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { Spectator, createTestComponentFactory } from '@ngneat/spectator';

describe('<%= classify(name)%>Component', () => {
  let spectator: Spectator<<%= classify(name)%>Component>;
  const createComponent = createTestComponentFactory(<%= classify(name)%>Component);

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
