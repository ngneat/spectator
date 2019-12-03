import { FormBuilder } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { DirectiveProviderDirective, directiveProviderToken } from './directive-providers.directive';

describe('DirectiveProviderDirective', () => {
  let host: SpectatorDirective<DirectiveProviderDirective>;

  const createHost = createDirectiveFactory({
    directive: DirectiveProviderDirective,
    directiveProviders: [{ provide: directiveProviderToken, useValue: 'notTest' }],
    directiveMocks: [FormBuilder]
  });

  it('should inject the provided value', () => {
    host = createHost(`<div directiveProvider>Testing Directive Providers</div>`);

    expect(host.directive.provider).toEqual('notTest');
  });
});
