/**
 * Credit - Angular Material
 */

import { parseKeyOptions } from './internals/key-parser';
import { KeyboardEventOptions } from './types';

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x: number = 0, y: number = 0, button: number = 0): MouseEvent {
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(type, true, false, window, 0, x, y, x, y, false, false, false, false, button, null);

  // `initMouseEvent` doesn't allow us to pass the `buttons` and
  // defaults it to 0 which looks like a fake event.
  Object.defineProperty(event, 'buttons', { get: () => 1 });

  return event;
}

/**
 * Creates a browser TouchEvent with the specified pointer coordinates.
 */
export function createTouchEvent(type: string, pageX: number = 0, pageY: number = 0): UIEvent {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = new UIEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    detail: 0,
  });

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: { value: [{ pageX, pageY }] },
  });

  return event;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(type: string, keyOrKeyCode: string | number | KeyboardEventOptions, target?: Element): KeyboardEvent {
  const { key, keyCode, modifiers } = parseKeyOptions(keyOrKeyCode);

  const event = document.createEvent('KeyboardEvent') as any;
  const originalPreventDefault = event.preventDefault;

  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  if (event.initKeyEvent) {
    event.initKeyEvent(type, true, true, window, modifiers.control, modifiers.alt, modifiers.shift, modifiers.meta, keyCode);
  } else {
    // `initKeyboardEvent` expects to receive modifiers as a whitespace-delimited string
    // See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
    const modifiersStr = (
      modifiers.control ? 'Control ' : '' + modifiers.alt ? 'Alt ' : '' + modifiers.shift ? 'Shift ' : '' + modifiers.meta ? 'Meta' : ''
    ).trim();
    event.initKeyboardEvent(
      type,
      true /* canBubble */,
      true /* cancelable */,
      window /* view */,
      0 /* char */,
      key /* key */,
      0 /* location */,
      modifiersStr /* modifiersList */,
      false /* repeat */
    );
  }

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    code: { get: () => keyCode },
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
    altKey: { get: () => !!modifiers.alt },
    ctrlKey: { get: () => !!modifiers.control },
    shiftKey: { get: () => !!modifiers.shift },
    metaKey: { get: () => !!modifiers.meta },
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  // eslint-disable-next-line
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', { configurable: true, get: () => true });

    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(type: string, canBubble: boolean = false, cancelable: boolean = true): Event {
  const event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);

  return event;
}
