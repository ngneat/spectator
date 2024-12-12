import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator/vitest';
import { StandaloneComponent } from '../../../../test/standalone/component/standalone.component';

describe('StandaloneComponent', () => {
  describe('with Spectator', () => {
    let spectator: Spectator<StandaloneComponent>;

    const createComponent = createComponentFactory({
      component: StandaloneComponent,
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should render a StandaloneComponent', () => {
      expect(spectator.query('#standalone')).toContainText('This stands alone!');
    });
  });

  describe('with SpectatorHost', () => {
    let host: SpectatorHost<StandaloneComponent>;

    const createHost = createHostFactory({
      component: StandaloneComponent,
      template: `<div><app-standalone></app-standalone></div>`,
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should render a StandaloneComponent', () => {
      expect(host.query('#standalone')).toContainText('This stands alone!');
    });
  });
});
