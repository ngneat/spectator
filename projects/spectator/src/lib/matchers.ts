/** Credit: https://github.com/unindented/custom-jquery-matchers/tree/master/packages/custom-jquery-matchers */
// tslint:disable:no-shadowed-variable

import $ from 'jquery';

import { hex2rgb, isHex, trim } from './internals/rgb-to-hex';

const hasProperty = (actual: unknown, expected: unknown): boolean => {
  return expected === undefined ? actual !== undefined : actual === expected;
};

const hasCss = (el: HTMLElement, css: { [key: string]: string }) => {
  let prop;
  let value;
  const $el = $(el);
  for (prop in css) {
    if (css.hasOwnProperty(prop)) {
      value = css[prop];

      if (isHex(value)) {
        value = hex2rgb(css[prop]);
      }

      if (value === 'auto' && $el.get(0).style[prop] === 'auto') {
        continue;
      }

      if (trim($el.css(prop)) !== trim(value)) {
        return false;
      }
    }
  }

  return true;
};

const hasSameText = (el: HTMLElement, expected: string | ((s: string) => boolean), exact = false) => {
  const actual = exact ? $(el).text() : $.trim($(el).text());

  if (expected && typeof expected !== 'string') {
    const pass = expected(actual);
    const message = () =>
      `Expected element${pass ? ' not' : ''} to have ${exact ? 'exact' : ''} text matching '${expected}',` + ` but had '${actual}'`;

    return { pass, message };
  }

  const pass = exact ? actual === expected : actual.indexOf(expected) !== -1;
  const message = () => `Expected element${pass ? ' not' : ''} to have ${exact ? 'exact' : ''} text '${expected}', but had '${actual}'`;

  return { pass, message };
};

const comparator = func => () => ({
  compare: func
});

/**
 *
 * expect('.zippy__content').not.toExist();
 */
export const toExist = comparator((el: string | Element) => {
  const actual = $(el).length;
  const pass = actual > 0;
  const message = () => `Expected ${el} element${pass ? ' not' : ''} to exist`;

  return { pass, message };
});

/**
 *
 * expect('.zippy__content').toHaveLength(3);
 */
export const toHaveLength = comparator((el: string, expected: number) => {
  const actual = $(el).length;
  const pass = actual === expected;
  const message = () => `Expected element${pass ? ' not' : ''} to have length ${expected}, but had ${actual}`;

  return { pass, message };
});

/**
 *
 * expect('.zippy__content').toHaveId('ID');
 */
export const toHaveId = comparator((el, expected) => {
  const actual = $(el).attr('id');
  const pass = actual === expected;
  const message = () => `Expected element${pass ? ' not' : ''} to have ID '${expected}', but had '${actual}'`;

  return { pass, message };
});

/**
 *
 * expect('.zippy__content').toHaveClass('class');
 * expect('.zippy__content').toHaveClass('class a, class b');
 */
export const toHaveClass = comparator((el, expected: string) => {
  const actual = $(el).attr('class');
  const pass = $(el).hasClass(expected);
  const message = () => `Expected element${pass ? ' not' : ''} to have class '${expected}', but had '${actual}'`;

  return { pass, message };
});

/**
 * expect(host.query('.zippy')).toHaveAttribute('id', 'zippy');
 */
export const toHaveAttribute = comparator((el, attr, val) => {
  const actual = $(el).attr(attr);
  const addendum = val !== undefined ? ` with value '${val}'` : '';
  const pass = hasProperty(actual, val);
  const message = () => `Expected element${pass ? ' not' : ''} to have attribute '${attr}'${addendum}, but had '${actual}'`;

  return { pass, message };
});

/**
 *  expect(host.query('.checkbox')).toHaveProperty('checked', true);
 */
export const toHaveProperty = comparator((el, prop, val) => {
  const actual = $(el).prop(prop);
  const addendum = val !== undefined ? ` with value '${val}'` : '';
  const pass = hasProperty(actual, val);
  const message = () => `Expected element${pass ? ' not' : ''} to have property '${prop}'${addendum}, but had '${actual}'`;

  return { pass, message };
});

/**
 *
 * expect('.zippy__content').toHaveText('Content');
 *
 * expect('.zippy__content').toHaveText((text) => text.includes('..');
 */
export const toHaveText = comparator((el, expected, exact = false) => hasSameText(el, expected, exact));

export const toHaveExactText = comparator((el, expected) => hasSameText(el, expected, true));

/**
 *
 * expect('.zippy__content').toHaveValue('value');
 */
export const toHaveValue = comparator((el, expected) => {
  const actual = $(el).val();
  const pass = actual === expected;
  const message = () => `Expected element${pass ? ' not' : ''} to have value '${expected}', but had '${actual}'`;

  return { pass, message };
});

/**
 *
 *  expect(host.element).toHaveStyle({
 *    backgroundColor: 'rgba(0, 0, 0, 0.1)'
 *  });
 */
export const toHaveStyle = comparator((el, expected) => {
  const pass = hasCss(el, expected);
  const message = () => `Expected element${pass ? ' not' : ''} to have CSS ${JSON.stringify(expected)}`;

  return { pass, message };
});

/**
 *
 * expect('.zippy__content').toHaveData({data: 'role', val: 'admin'});
 */
export const toHaveData = comparator((el, { data, val }) => {
  const actual = $(el).data(data);
  const addendum = val !== undefined ? ` with value '${val}'` : '';
  const pass = hasProperty(actual, val);
  const message = () => `Expected element${pass ? ' not' : ''} to have data '${data}'${addendum}, but had '${actual}'`;

  return { pass, message };
});

/**
 *
 * expect('.checkbox').toBeChecked();
 */
export const toBeChecked = comparator(el => {
  const pass = $(el).is(':checked');
  const message = () => `Expected element${pass ? ' not' : ''} to be checked`;

  return { pass, message };
});

/**
 *
 * expect('.checkbox').toBeDisabled();
 */
export const toBeDisabled = comparator(el => {
  const pass = $(el).is(':disabled');
  const message = () => `Expected element${pass ? ' not' : ''} to be disabled`;

  return { pass, message };
});

/**
 * An empty element is an element without child elements or text.
 *
 * expect('div').toBeEmpty();
 */
export const toBeEmpty = comparator(el => {
  const pass = $(el).is(':empty');
  const message = () => `Expected element${pass ? ' not' : ''} to be empty`;

  return { pass, message };
});

/**
 * Hidden elements are elements that have:
 * 1. Display property set to "none"
 * 2. Width and height set to 0
 * 3. A hidden parent element (this also hides child elements)
 * 4. Type equal to "hidden" (only for form elements)
 * 5. A "hidden" attribute
 */
function isHidden(elOrSelector: HTMLElement | string): boolean {
  let el = $(elOrSelector)[0];

  if (!el) {
    return true;
  }

  while (el) {
    if (el === document) {
      break;
    }

    if (
      !(el.offsetWidth || el.offsetHeight || el.getClientRects().length) ||
      el.style.display === 'none' ||
      el.style.visibility === 'hidden' ||
      el.type === 'hidden' ||
      el.hasAttribute('hidden')
    ) {
      return true;
    }

    el = el.parentNode;
  }

  return false;
}

/**
 * Hidden elements are elements that have:
 * 1. Display property set to "none"
 * 2. Width and height set to 0
 * 3. A hidden parent element (this also hides child elements)
 * 4. Type equal to "hidden" (only for form elements)
 * 5. A "hidden" attribute
 *
 * expect('div').toBeHidden();
 *
 */
export const toBeHidden = comparator(el => {
  const pass = isHidden(el);
  const message = () => `Expected element${pass ? ' not' : ''} to be hidden`;

  return { pass, message };
});

/**
 * The :selected selector selects option elements that are pre-selected.
 *
 * expect('div').toBeSelected();
 *
 */
export const toBeSelected = comparator(el => {
  const pass = $(el).is(':selected');
  const message = () => `Expected element${pass ? ' not' : ''} to be selected`;

  return { pass, message };
});

/**
 * Hidden elements are elements that have:
 * 1. Display property set to "none"
 * 2. Width and height set to 0
 * 3. A hidden parent element (this also hides child elements)
 * 4. Type equal to "hidden" (only for form elements)
 * 5. A "hidden" attribute
 *
 * expect('div').toBeVisible();
 *
 */
export const toBeVisible = comparator(el => {
  const pass = !isHidden(el);

  const message = () => `Expected element${pass ? ' not' : ''} to be visible`;

  return { pass, message };
});

/**
 * The :focus selector selects the element that currently has focus.
 *
 * expect('input').toBeFocused();
 */
export const toBeFocused = comparator(el => {
  const element = $(el).get(0);
  const pass = element === element.ownerDocument.activeElement;
  const message = () => `Expected element${pass ? ' not' : ''} to be focused`;

  return { pass, message };
});

/**
 * Check to see if the set of matched elements matches the given selector
 * returns true if the dom contains the element
 *
 * expect('div').toBeMatchedBy('.js-something')
 */
export const toBeMatchedBy = comparator((el, expected) => {
  const actual = $(el).filter(expected).length;
  const pass = actual > 0;
  const message = () => `Expected element${pass ? ' not' : ''} to be matched by '${expected}'`;

  return { pass, message };
});

/**
 *
 * expect('div').toHaveDescendant('.child')
 */
export const toHaveDescendant = comparator((el, selector) => {
  const actual = $(el).find(selector).length;
  const pass = actual > 0;
  const message = () => `Expected element${pass ? ' not' : ''} to contain child '${selector}'`;

  return { pass, message };
});

/**
 *
 * expect('div').toHaveDescendantWithText({selector: '.child', text: 'text'})
 */
export const toHaveDescendantWithText = comparator((el, { selector, text }) => {
  const actual = $.trim(
    $(el)
      .find(selector)
      .text()
  );
  if (text && $.isFunction(text.test)) {
    const pass = text.test(actual);
    const message = () =>
      `Expected element${pass ? ' not' : ''} to have descendant '${selector}' with text matching '${text}',` + ` but had '${actual}'`;

    return { pass, message };
  }
  const pass = actual.indexOf(text) !== -1;
  const message = () => `Expected element${pass ? ' not' : ''} to have descendant '${selector}' with text '${text}', but had '${actual}'`;

  return { pass, message };
});
