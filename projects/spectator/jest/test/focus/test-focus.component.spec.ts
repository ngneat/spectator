import { SpectatorHost, createHostFactory } from '@ngneat/spectator/jest';

import { TestFocusComponent } from '../../../test/focus/test-focus.component';

describe('SpectatorHost.focus() in jest', () => {
  const createHost = createHostFactory(TestFocusComponent);
  let host: SpectatorHost<TestFocusComponent>;

  beforeEach(() => {
    host = createHost('<app-test-focus></app-test-focus>');
  });

  it('sets document.activeElement', () => {
    host.focus('#button1');

    expect(host.query('#button1')).toBeFocused();
  });

  it('causes blur events', () => {
    host.focus();
    host.focus('#button1');
    host.focus('#button2');

    expect(host.component.focusCount('app-test-focus')).toBe(1);
    expect(host.component.blurCount('app-test-focus')).toBe(1);
    expect(host.component.focusCount('button1')).toBe(1);
    expect(host.component.blurCount('button1')).toBe(1);
    expect(host.component.focusCount('button2')).toBe(1);
    expect(host.component.blurCount('button2')).toBe(0);
  });

  it('calling focus() multiple times does not cause multiple patches', () => {
    host.focus('#button1');
    host.focus();
    host.focus('#button1');

    expect(host.component.focusCount('app-test-focus')).toBe(1);
    expect(host.component.focusCount('button1')).toBe(2);
    expect(host.component.blurCount('button1')).toBe(1);
  });
});
