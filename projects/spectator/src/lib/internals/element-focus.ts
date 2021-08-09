import { dispatchFakeEvent } from '../dispatch-events';
import { isRunningInJsDom } from '../utils';

/** Property added to HTML Elements to ensure we don't double-patch focus methods on an element. */
const IS_FOCUS_PATCHED_PROP = Symbol('isFocusPatched');

/** Ensures that a single set of matching focus and blur events occur when HTMLElement.focus() is called. */
class FocusEventWatcher implements EventListenerObject {

  private readonly priorActiveElement: Element | null;

  /** Set to true when browser sends a blur event for priorActiveElement */
  private _blurred = false;
  /** Set to true when browser sends a focus event for element */
  private _focused = false;

  constructor(private readonly element: HTMLElement) {
    this.element.addEventListener('focus', this);
    this.priorActiveElement = element.ownerDocument.activeElement;
    this.priorActiveElement?.addEventListener('blur', this);
  }

  public handleEvent({ type }: Event): void {
    if (type === 'focus') {
      this._focused = true;
    }
    else if (type === 'blur') {
      this._blurred = true;
    }
  }

  /**
   * If focus and blur events haven't occurred, fire fake ones.
   */
  public ensureFocusEvents() {
    this.element.removeEventListener('focus', this);
    this.priorActiveElement?.removeEventListener('blur', this);

    // Ensure priorActiveElement is blurred
    if (!this._blurred && this.priorActiveElement) {
      dispatchFakeEvent(this.priorActiveElement, 'blur');
    }

    if (!this._focused) {
      dispatchFakeEvent(this.element, 'focus'); // Needed to cause focus event
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
    const originalFocus = element.focus.bind(element);
    element.focus = (options) => {
      const focusEventWatcher = new FocusEventWatcher(element);

      // Sets document.activeElement. May or may not send focus + blur events
      originalFocus(options);

      focusEventWatcher.ensureFocusEvents();
    }
    element.blur = () => dispatchFakeEvent(element, 'blur');
    element[IS_FOCUS_PATCHED_PROP] = true;
  }
}
