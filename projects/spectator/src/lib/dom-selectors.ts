import {
  Matcher,
  MatcherOptions,
  NormalizerFn,
  SelectorMatcherOptions,
  queries as DOMQueries,
  getDefaultNormalizer,
  ByRoleOptions
} from '@testing-library/dom';

interface MandatorySelectorMatchingOptions extends MatcherOptions {
  selector: SelectorMatcherOptions['selector'];
}

export class DOMSelector {
  // Wrap selector functions in a class to make reflection easier in getChild
  constructor(public readonly execute: (el: HTMLElement) => HTMLElement[]) {}
}

export type DOMSelectorFactory<TOptions extends MatcherOptions = MatcherOptions> = (matcher: Matcher, options?: TOptions) => DOMSelector;

export const byLabel: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByLabelText(el, matcher, options));

export const byPlaceholder: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByPlaceholderText(el, matcher, options));

export const byText: DOMSelectorFactory<SelectorMatcherOptions> = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByText(el, matcher, options));

export const byTextContent = (matcher: Matcher, options: MandatorySelectorMatchingOptions): DOMSelector => {
  let textContentMatcher: Matcher;
  const normalizer: NormalizerFn = options?.normalizer || getDefaultNormalizer(options);
  const getTextContent = (elem: Element | null): string => normalizer(elem?.textContent ?? '');

  if (typeof matcher === 'string' || typeof matcher === 'number') {
    textContentMatcher = (_, elem) => {
      if (options?.exact === false) {
        return (
          getTextContent(elem)
            .toLowerCase()
            .indexOf(matcher.toString().toLowerCase()) >= 0
        );
      }

      return getTextContent(elem) === matcher.toString();
    };
  } else if (matcher instanceof RegExp) {
    textContentMatcher = (_, elem) => matcher.test(getTextContent(elem));
  } else if (typeof matcher === 'function') {
    textContentMatcher = (_, elem) => matcher(getTextContent(elem), elem);
  } else {
    throw new Error(`Matcher type not supported: ${typeof matcher}`);
  }

  return new DOMSelector(el => DOMQueries.queryAllByText(el, textContentMatcher, options));
};

export const byAltText: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByAltText(el, matcher, options));

export const byTitle: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTitle(el, matcher, options));

export const byTestId: DOMSelectorFactory = (matcher, options) => new DOMSelector(el => DOMQueries.queryAllByTestId(el, matcher, options));

export const byValue: DOMSelectorFactory = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByDisplayValue(el, matcher, options));

export const byRole: DOMSelectorFactory<ByRoleOptions> = (matcher, options) =>
  new DOMSelector(el => DOMQueries.queryAllByRole(el, matcher, options));
