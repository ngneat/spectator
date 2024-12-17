import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { Directive, Inject, InjectionToken } from '@angular/core';
import { overrideDirectives } from '../../src/lib/spectator/create-factory';

// Created only for testing purpose
export const directiveProviderToken = new InjectionToken('DirectiveProviderToken');
@Directive({
  selector: `[appStandaloneDirectiveWithDependency]`,
  standalone: true,
  providers: [{ provide: directiveProviderToken, useValue: 'test' }],
})
export class StandaloneDirectiveWithDependency {
  constructor(@Inject(directiveProviderToken) public provider: string) {}
}

@Directive({
  selector: `app-non-standalone-directive`,
  standalone: false,
})
export class MockNonStandaloneDirective {
  constructor() {}
}

describe('Override Directive', () => {
  it('should throw error when override non standalone directive', () => {
    expect(() =>
      overrideDirectives({
        overrideDirectives: [
          [
            MockNonStandaloneDirective,
            {
              remove: { imports: [] },
              add: { imports: [] },
            },
          ],
        ],
      } as any),
    ).toThrowError('Can not override non standalone directive');
  });

  describe('with Spectator', () => {
    let spectator: SpectatorDirective<StandaloneDirectiveWithDependency>;

    const createDirective = createDirectiveFactory({
      directive: StandaloneDirectiveWithDependency,
      overrideDirectives: [
        [
          StandaloneDirectiveWithDependency,
          {
            remove: { providers: [{ provide: directiveProviderToken, useValue: 'test' }] },
            add: { providers: [{ provide: directiveProviderToken, useValue: 'fakeTest' }] },
          },
        ],
      ],
      template: `<div class="default" appStandaloneDirectiveWithDependency>Testing Directive Providers</div>`,
    });

    beforeEach(() => {
      spectator = createDirective();
    });

    it('should render a StandaloneDirectiveWithDependency', () => {
      expect(spectator.directive.provider).toEqual('fakeTest');
    });
  });
});
