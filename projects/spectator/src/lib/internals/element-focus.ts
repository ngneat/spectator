import { dispatchFakeEvent } from '../dispatch-events';

/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 *
 * patchElementFocus(triggerEl);
 */
export function patchElementFocus(element: HTMLElement): void {
  element.focus = () => dispatchFakeEvent(element, 'focus');
  element.blur = () => dispatchFakeEvent(element, 'blur');
}
