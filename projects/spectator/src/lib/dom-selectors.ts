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
  const getTextContent = (elem: HTMLElement): string => normalizer(elem.textContent ?? '');

  if (typeof matcher === 'string') {
    textContentMatcher = (_, elem) => {
      if (options?.exact === false) {
        return (
          getTextContent(elem)
            .toLowerCase()
            .indexOf(matcher.toLowerCase()) >= 0
        );
      }

      return getTextContent(elem) === matcher;
    };
  } else if (matcher instanceof RegExp) {
    textContentMatcher = (_, elem) => matcher.test(getTextContent(elem));
  } else {
    textContentMatcher = (_, elem) => matcher(getTextContent(elem), elem);
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
