import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { StandaloneDirective } from './standalone.directive';

describe('StandaloneDirective', () => {
  describe('with SpectatorDirective', () => {
    let spectator: SpectatorDirective<StandaloneDirective>;

    const createDirective = createDirectiveFactory({
      directive: StandaloneDirective,
      template: `<div appStandalone>This stands alone!</div>`,
    });

    beforeEach(() => {
      spectator = createDirective();
    });

    it('should render a StandaloneDirective', () => {
      expect(spectator.query("[class='btn']")).toContainText('This stands alone!');
    });
  });
});
