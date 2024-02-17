import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { SignalInputComponent } from './signal-input.component';

describe('SignalInputComponent', () => {
  describe('with Spectator', () => {
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
      template: `<div><app-signal-input [show]="show"></app-signal-input></div>`,
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should render a SignalInputComponent', () => {
      expect(host.query('#text')).not.toExist();
      host.setHostInput({ show: true });
      expect(host.query('#text')).toContainText('Hello');
    });
  });
});
