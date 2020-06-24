import { CustomMatcherFactory } from './matchers';

declare var jasmine: any;
declare var jest: any;

export function addMatchers(matchers: Record<string, CustomMatcherFactory>): void {
  if (!matchers) return;

  if (typeof jasmine !== 'undefined') {
    jasmine.addMatchers(matchers);
  }
  if (typeof jest !== 'undefined') {
    const jestExpectExtend = {};
    for (const key of Object.keys(matchers)) {
      if (key.startsWith('to')) jestExpectExtend[key] = matchers[key]().compare;
    }

    (expect as any).extend(jestExpectExtend);
  }
}
