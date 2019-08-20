import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let spectator: Spectator<EventsComponent>;

  const createComponent = createComponentFactory(EventsComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should change the text on focus/blur', () => {
    spectator.focus('input');
    expect(spectator.query('h1')).toHaveText('focus');
    spectator.blur('input');
    expect(spectator.query('h1')).toHaveText('blur');
    spectator.keyboard.pressKey('a', 'input');
    expect(spectator.query('h1')).toHaveText('pressed a');
  });
});
