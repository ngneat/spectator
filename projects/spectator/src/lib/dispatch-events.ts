/**
 * Credit - Angular Material
 */

import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './internals/event-objects';

/**
 * Utility to dispatch any event on a Node.
 *
 * @publicApi
 */
export function dispatchEvent<E extends Event = Event>(node: Node | Window, event: E): E {
  node.dispatchEvent(event);

  return event;
}

/**
 * Shorthand to dispatch a fake event on a specified node.
 *
 * dispatchFakeEvent(element, 'mousedown');
 *
 * @publicApi
 */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
  return dispatchEvent(node, createFakeEvent(type, canBubble));
}

/**
 * Shorthand to dispatch a keyboard event with a specified key.
 *
 *  dispatchKeyboardEvent(calendarBodyEl, 'keydown', 'LEFT_ARROW');
 *
 *  @publicApi
 */
export function dispatchKeyboardEvent(node: Node, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyOrKeyCode, target));
}

/**
 * Shorthand to dispatch a mouse event on the specified coordinates.
 *
 *  dispatchMouseEvent(rippleTarget, 'mousedown', 50, 75);
 *  dispatchMouseEvent(rippleTarget, 'mouseup');
 *
 *  @publicApi
 */
export function dispatchMouseEvent(
  node: Node,
  type: string,
  x: number = 0,
  y: number = 0,
  event: MouseEvent = createMouseEvent(type, x, y)
): MouseEvent {
  return dispatchEvent(node, event);
}

/**
 * Shorthand to dispatch a touch event on the specified coordinates.
 *
 * dispatchTouchEvent(rippleTarget, 'touchstart');
 *
 * @publicApi
 */
export function dispatchTouchEvent(node: HTMLElement | Window | Document, type: string, x: number = 0, y: number = 0): Event {
  return dispatchEvent(node, createTouchEvent(type, x, y));
}
