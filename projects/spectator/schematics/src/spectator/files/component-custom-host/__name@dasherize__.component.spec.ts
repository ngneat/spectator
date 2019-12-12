import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator<% if (jest) { %>/jest<% } %>';

import { <%= classify(name)%>Component } from './<%= dasherize(name)%>.component';

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('<%= classify(name)%>Component', () => {
  let host: SpectatorHost<<%= classify(name)%>Component, CustomHostComponent>;
  const createHost = createHostFactory({
    component: <%= classify(name)%>Component,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
