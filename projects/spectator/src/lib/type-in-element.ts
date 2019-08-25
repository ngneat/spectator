import { dispatchFakeEvent } from './dispatch-events';

/**
 * Focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 * @param value Value to be set on the input.
 * @param element Element onto which to set the value.
 *
 * typeInElement('al', input);
 */
export function typeInElement(value: string, element: HTMLElement | Document | Window): void {
  if (!(element instanceof HTMLInputElement)) {
    return;
  }

  element.focus();
  element.value = value;
  dispatchFakeEvent(element, 'input', true);
}
