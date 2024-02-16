import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';
import { StandalonePipe } from './standalone.pipe';

describe('StandalonePipe', () => {
  describe('with SpectatorPipe', () => {
    let spectator: SpectatorPipe<StandalonePipe>;

    const createPipe = createPipeFactory({
      pipe: StandalonePipe,
      template: `<div id="standalone">{{ 'This' | standalone }}</div>`,
    });

    beforeEach(() => {
      spectator = createPipe();
    });

    it('should render and execute the StandalonePipe', () => {
      expect(spectator.element.querySelector('#standalone')).toContainText('This stands alone!');
    });
  });

  describe('with host inputs', () => {
    let spectator: SpectatorPipe<StandalonePipe>;

    const createPipe = createPipeFactory({
      pipe: StandalonePipe,
    });

    beforeEach(() => {
      spectator = createPipe(`<div id="standalone">{{ thisField | standalone }}</div>`, { hostProps: { thisField: 'This' } });
    });

    fit('should render and execute the StandalonePipe', () => {
      expect(spectator.element.querySelector('#standalone')).toContainText('This stands alone!');
    });
  });
});
