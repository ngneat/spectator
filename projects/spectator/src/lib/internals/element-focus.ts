import { dispatchFakeEvent } from '../dispatch-events';
import { isRunningInJsDom } from '../utils';

/** Property name added to HTML Elements to ensure we don't double-patch focus methods on an element. */
const IS_FOCUS_PATCHED_PROP = '_patched_focus';

/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 *
 * patchElementFocus(triggerEl);
 */
export function patchElementFocus(element: HTMLElement): void {

  // https://github.com/ngneat/spectator/issues/373 - Don't patch when using JSDOM, eg in Jest
  if (!isRunningInJsDom() && (element[IS_FOCUS_PATCHED_PROP] === undefined)) {
    const baseFocus = element.focus.bind(element);
    element.focus = (options) => {
      // Blur current active
      const active = element.ownerDocument.activeElement;
      if (active) {
        dispatchFakeEvent(active, 'blur');
      }

      // Focus
      baseFocus(options); // Needed to set document.activeElement
      dispatchFakeEvent(element, 'focus'); // Needed to cause focus event
    }
    element.blur = () => dispatchFakeEvent(element, 'blur');
    element[IS_FOCUS_PATCHED_PROP] = true;
  }
}
