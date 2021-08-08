import { dispatchFakeEvent } from '../dispatch-events';
import { isRunningInJsDom } from '../utils';

/** Property name added to HTML Elements to ensure we don't double-patch focus methods on an element. */
const IS_FOCUS_PATCHED_PROP = '_patched_focus';

/** Ensures that a single set of matching focus and blur events occur when HTMLElement.focus() is called. */
class FocusEventWatcher implements EventListenerObject {

  private readonly _active: Element | null;
  private _blurred = false;
  private _focused = false;

  constructor(private readonly _e: HTMLElement) {
    this._active = _e.ownerDocument.activeElement;
    this._e.addEventListener('focus', this);
    this._active?.addEventListener('blur', this);
  }
  public handleEvent(evt: Event): void {
    if (evt.type === 'focus') {
      this._focused = true;
    }
    else if (evt.type === 'blur') {
      this._blurred = true;
    }
  }

  /**
   * If focus and blur events haven't occurred, fire fake ones.
   */
  public ensureFocusEvents() {
    this._e.removeEventListener('focus', this);
    this._active?.removeEventListener('blur', this);

    // Ensure activeElement is blurred
    if (this._active && !this._blurred && this._active === this._e.ownerDocument.activeElement) {
      dispatchFakeEvent(this._active, 'blur');
    }

    if (!this._focused) {
      dispatchFakeEvent(this._e, 'focus'); // Needed to cause focus event
    }
  }
}

/**
 * Patches an element's focus and blur methods to emit events consistently and predictably in tests.
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
      const w = new FocusEventWatcher(element);

      // Sets document.activeElement. May or may not send focus + blur events
      baseFocus(options);

      w.ensureFocusEvents();
    }
    element.blur = () => dispatchFakeEvent(element, 'blur');
    element[IS_FOCUS_PATCHED_PROP] = true;
  }
}
