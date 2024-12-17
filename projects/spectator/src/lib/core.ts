import { CustomMatcherFactory } from './matchers';

declare var jasmine: any;

export function addMatchers(matchers: Record<string, CustomMatcherFactory>): void {
  if (!matchers) return;

  if (typeof jasmine !== 'undefined') {
    jasmine.addMatchers(matchers);
  } else {
    // Jest (when using ESM) and Vitest aren't on the global scope so we
    // assume that it's Jest or Vitest if Jasmine is not defined
    const jestVitestExpectExtend = {};
    for (const key of Object.keys(matchers)) {
      if (key.startsWith('to')) jestVitestExpectExtend[key] = matchers[key]().compare;
    }

    (expect as any).extend(jestVitestExpectExtend);
  }
}
