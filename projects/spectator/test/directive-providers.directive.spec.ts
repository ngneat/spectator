import { FormBuilder } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { DirectiveProviderDirective, directiveProviderToken } from './directive-providers.directive';

describe('DirectiveProviderDirective', () => {
  let host: SpectatorDirective<DirectiveProviderDirective>;

  const createHost = createDirectiveFactory({
    directive: DirectiveProviderDirective,
    directiveProviders: [{ provide: directiveProviderToken, useValue: 'notTest' }],
    directiveMocks: [FormBuilder],
    template: `<div class="default" directiveProvider>Testing Directive Providers</div>`
  });

  it('should inject the provided value', () => {
    host = createHost();
    expect(host.directive.provider).toEqual('notTest');
  });

  it('should use the default template by default', () => {
    host = createHost();
    expect('.default').toExist();
  });

  it('should use more specific templates if given', () => {
    host = createHost(`<div class="override" directiveProvider>Testing Directive Providers</div>`);
    expect('.override').toExist();
  });
});
