import { dispatchFakeEvent } from './dispatch-events';
import { isString, isHTMLOptionElementArray, SelectOptions } from './types';

/**
 * Focuses a select element, selects the correct options and dispatches
 * the `change` event, simulating the user selecting an option
 * @param options Options to be selected.
 * @param element Element onto which to select the options.
 * @param config Object with extra config to dispatch change event when option selected
 *
 * selectOption('al' | ['al', 'ab'], select, config);
 */
export function selectOption(
  options: SelectOptions,
  element: HTMLElement | HTMLSelectElement | Document | Window,
  config: { emitEvents: boolean }
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

    setOptionSelected(option, element, config);
  } else if (options instanceof HTMLOptionElement) {
    setOptionSelected(options, element, config);
  } else {
    if (!element.multiple) {
      return;
    }

    if (isHTMLOptionElementArray(options)) {
      options.forEach(option => setOptionSelected(option, element, config));
    } else {
      element.querySelectorAll('option').forEach(opt => {
        if (options.includes(opt.value)) {
          setOptionSelected(opt, element, config);
        }
      });
    }
  }
}

/**
 * Set the option in the HTMLSelectElement to selected
 * @param option HTMLOptionElement to select
 * @param select HTMLSelectElement to add the options to
 * @param config Object with extra config to dispatch change event when option selected
 *
 * setOptionSelected(option, element, config);
 */
function setOptionSelected(option: HTMLOptionElement, select: HTMLSelectElement, config: { emitEvents: boolean }): void {
  option.selected = true;
  if (config.emitEvents) {
    dispatchFakeEvent(select, 'change', true);
  }
}
