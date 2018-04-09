/** Credit - Angular Material **/

import { createFakeEvent, createKeyboardEvent, createMouseEvent, createTouchEvent } from './event-objects';

/** Utility to dispatch any event on a Node.*/
export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

/** Shorthand to dispatch a fake event on a specified node.
 *
 * dispatchFakeEvent(element, 'mousedown');
 *
 */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
  return dispatchEvent(node, createFakeEvent(type, canBubble));
}

/** Shorthand to dispatch a keyboard event with a specified key.
 *
 *  dispatchKeyboardEvent(calendarBodyEl, 'keydown', 'LEFT_ARROW');
 *
 * */
export function dispatchKeyboardEvent(node: Node, type: string, keyOrKeyCode: string | number, target?: Element): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyOrKeyCode, target)) as KeyboardEvent;
}

/** Shorthand to dispatch a mouse event on the specified coordinates.
 *
 *  dispatchMouseEvent(rippleTarget, 'mousedown', 50, 75);
 *  dispatchMouseEvent(rippleTarget, 'mouseup');
 *
 * */
export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}

/** Shorthand to dispatch a touch event on the specified coordinates.
 *
 * dispatchTouchEvent(rippleTarget, 'touchstart');
 *
 * */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
  return dispatchEvent(node, createTouchEvent(type, x, y));
}
