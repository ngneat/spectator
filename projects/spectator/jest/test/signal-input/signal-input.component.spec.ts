import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator/jest';
import { SignalInputComponent } from '../../../test/signal-input/signal-input.component';

describe('SignalInputComponent', () => {
  fdescribe('with Spectator', () => {
    let spectator: Spectator<SignalInputComponent>;

    const createComponent = createComponentFactory({
      component: SignalInputComponent,
    });

    beforeEach(() => {
      spectator = createComponent({ props: { show: true } });
    });

    it('should render a SignalInputComponent', () => {
      expect(spectator.query('#text')).toContainText('Hello');
    });
  });

  describe('with SpectatorHost', () => {
    let host: SpectatorHost<SignalInputComponent>;

    const createHost = createHostFactory({
      component: SignalInputComponent,
      shallow: true,
      template: `<div><app-signal-input [show]="true"></app-signal-input></div>`,
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should render a SignalInputComponent', () => {
      console.log(host.hostElement.innerHTML);
      expect(host.query('#text')).toContainText('Hello');
    });
  });
});
