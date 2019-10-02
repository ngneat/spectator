import { dispatchFakeEvent } from './dispatch-events';

/**
 * Focuses an input or textarea, sets its value and dispatches
 * the `input` or `textarea` event, simulating the user typing.
 * @param value Value to be set on the input.
 * @param element Element onto which to set the value.
 *
 * typeInElement('al', input);
 */
export function typeInElement(value: string, element: HTMLElement | Document | Window): void {
  if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement)) {
    return;
  }

  element.focus();
  element.value = value;
  dispatchFakeEvent(element, 'input', true);
}
