import { Matcher, MatcherOptions, queries as DOMQueries } from '@testing-library/dom';

export class DOMSelector {
  // Wrap selector functions in a class to make reflection easier in getChild
  constructor(public readonly execute: (el: HTMLElement) => HTMLElement[]) {}
}

export type DOMSelectorFactory = (matcher: Matcher, options?: MatcherOptions) => DOMSelector;

export const byLabel: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByLabelText(el, matcher, options));

export const byPlaceholder: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByPlaceholderText(el, matcher, options));

export const byText: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByText(el, matcher, options));

export const byAltText: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByAltText(el, matcher, options));

export const byTitle: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTitle(el, matcher, options));

export const byTestId: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTestId(el, matcher, options));

export const byValue: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByDisplayValue(el, matcher, options));
