import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let spectator: Spectator<EventsComponent>;

  const createComponent = createComponentFactory(EventsComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should handle focus', () => {
    spectator.focus('input');
    expect(spectator.query('h1')).toHaveText('focus');
  });

  it('should handle blur', () => {
    spectator.blur('input');
    expect(spectator.query('h1')).toHaveText('blur');
  });

  it('should handle single key press', () => {
    spectator.keyboard.pressKey('a', 'input');
    expect(spectator.query('h1')).toHaveText('pressed a');
  });

  it('should handle key with single modifier', () => {
    spectator.keyboard.pressKey('ctrl.a', 'input');
    expect(spectator.query('h1')).toHaveText('pressed ctrl.a');
  });

  it('should handle key with multiple modifiers', () => {
    spectator.keyboard.pressKey('ctrl.shift.a', 'input');
    expect(spectator.query('h1')).toHaveText('pressed ctrl.shift.a');
  });

  it('should handle a single dot correctly', () => {
    spectator.keyboard.pressKey('.', 'input');
    expect(spectator.query('h1')).toHaveText('pressed dot');
  });

  it('should include key and keyCode when KeyboardEventOptions are passed', () => {
    spectator.dispatchKeyboardEvent('input', 'keyup', { key: 'ArrowLeft', keyCode: 40 });
    expect(spectator.query('h1')).toHaveText('pressed ArrowLeft:40');
  });

  it('should parse modifiers from KeyboardEventOptions.key', () => {
    spectator.dispatchKeyboardEvent('input', 'keyup', { key: 'ctrl.shift.ArrowRight', keyCode: 39 });
    expect(spectator.query('h1')).toHaveText('pressed ArrowRight:39');
  });

  it('should fail when the pressKey sequence contains only dots', () => {
    try {
      spectator.keyboard.pressKey('...', 'input');
      fail('Expected that an error is thrown');
    } catch (e) {
      expect(e.message).toEqual('invalid key modifier: undefined, keyStr: ...');
    }
  });
});
