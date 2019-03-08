import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';
import { Component } from '@angular/core';

@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('<%= classify(name)%>Component', () => {
  let host: SpectatorWithHost<<%= classify(name)%>Component, CustomHostComponent>;

  const createHost = createHostComponentFactory({ component: <%= classify(name)%>Component, host: CustomHostComponent });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
