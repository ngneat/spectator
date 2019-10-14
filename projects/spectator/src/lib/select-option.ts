import { dispatchFakeEvent } from './dispatch-events';
import { isString } from './types';

/**
 * Focuses a select element, selects the correct options and dispatches
 * the `change` event, simulating the user selecting an option
 * @param options Options to be selected.
 * @param element Element onto which to select the options.
 * @param emitEvents boolean to dispatch change event when option selected
 *
 * selectOption('al' | ['al', 'ab'], select);
 */
export function selectOption(
  options: string | string[],
  element: HTMLElement | HTMLSelectElement | Document | Window,
  emitEvents: boolean
): void {
  if (!(element instanceof HTMLSelectElement)) {
    return;
  }

  element.focus();

  if (isString(options)) {
    const option: HTMLOptionElement | null = element.querySelector(`option[value="${options}"]`);
    if (!option) {
      return;
    }

    setOptionSelected(option, element, emitEvents);
  } else {
    if (!element.multiple) {
      return;
    }

    element.querySelectorAll('option').forEach(opt => {
      if (options.includes(opt.value)) {
        setOptionSelected(opt, element, emitEvents);
      }
    });
  }
}

/**
 * Set the option in the HTMLSelectElement to selected
 * @param option HTMLOptionElement to select
 * @param select HTMLSelectElement to add the options to
 * @param emitEvents boolean to dispatch change event when option selected
 *
 * setOptionSelected(option, element);
 */
function setOptionSelected(option: HTMLOptionElement, select: HTMLSelectElement, emitEvents: boolean): void {
  option.selected = true;
  if (emitEvents) {
    dispatchFakeEvent(select, 'change', true);
  }
}
