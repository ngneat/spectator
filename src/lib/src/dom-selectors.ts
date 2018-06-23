import { queries as DOMQueries } from 'dom-testing-library';

// NOTE: currently have to duplicate some of the types declared in dom-testing-libary@2.6.2 but use dom-testing-library@2.1.0.
// This is because 2.6.2's typings use the `infer` keyword which errors on TypeScript < 2.8, and Angular does not currently
// support 2.8. When it does, we can use DTL@2.6.2 and remove these typings.
export type DOMMatcherFunction = (content: string, element: HTMLElement) => boolean;
export type DOMMatcher = string | RegExp | DOMMatcherFunction;
export interface DOMMatcherOptions {
  exact?: boolean;
  trim?: boolean;
  collapseWhitespace?: boolean;
}

export type DOMMatch = (textToMatch: string, node: HTMLElement | null, matcher: DOMMatcher, options?: DOMMatcherOptions) => boolean;

export interface DOMSelectorMatcherOptions extends DOMMatcherOptions {
  selector?: string;
}

export class DOMSelector {
  // Wrap selector functions in a class to make reflection easier in _getChild
  constructor(public readonly execute: (el: HTMLElement) => HTMLElement[]) {}
}

export type DOMSelectorFactory = (matcher: DOMMatcher, options?: DOMSelectorMatcherOptions) => DOMSelector;

export const byLabel: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByLabelText(el, matcher, options));

export const byPlaceholder: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByPlaceholderText(el, matcher, options));

export const byText: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByText(el, matcher, options));

export const byAltText: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByAltText(el, matcher, options));

export const byTitle: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTitle(el, matcher, options));

export const byTestId: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTestId(el, matcher, options));

export const byValue: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByValue(el, matcher, options));
