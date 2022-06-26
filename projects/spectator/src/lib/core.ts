import { CustomMatcherFactory } from './matchers';

declare var jasmine: any;

export function addMatchers(matchers: Record<string, CustomMatcherFactory>): void {
  if (!matchers) return;

  if (typeof jasmine !== 'undefined') {
    jasmine.addMatchers(matchers);
  } else {
    // Jest isn't on the global scope when using ESM so we
    // assume that it's Jest if Jasmine is not defined
    const jestExpectExtend = {};
    for (const key of Object.keys(matchers)) {
      if (key.startsWith('to')) jestExpectExtend[key] = matchers[key]().compare;
    }

    (expect as any).extend(jestExpectExtend);
  }
}
