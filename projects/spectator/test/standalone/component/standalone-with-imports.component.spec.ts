import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { StandaloneComponent } from './standalone.component';
import {
  MockStandaloneChildComponent,
  StandaloneChildComponent,
  StandaloneWithImportsComponent,
} from './standalone-with-imports.component';

describe('StandaloneWithImportsComponent', () => {
  describe('with Spectator', () => {
    let spectator: Spectator<StandaloneWithImportsComponent>;

    const createComponent = createComponentFactory({
      component: StandaloneWithImportsComponent,
      componentImports: [[StandaloneChildComponent, MockStandaloneChildComponent]],
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should render a StandaloneComponent with overridden import', () => {
      expect(spectator.query('#child-standalone')).toContainText('Mocked!');
    });
  });

  describe('with SpectatorHost', () => {
    let host: SpectatorHost<StandaloneComponent>;

    const createHost = createHostFactory({
      component: StandaloneWithImportsComponent,
      template: `<app-standalone-with-imports />`,
      componentImports: [[StandaloneChildComponent, MockStandaloneChildComponent]],
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should render a StandaloneComponent', () => {
      expect(host.query('#child-standalone')).toContainText('Mocked!');
    });
  });
});
