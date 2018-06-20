import { Directive, EventEmitter } from '@angular/core';

/**
 * Examples:
 * MockDirective({ selector: 'some-directive' });
 * MockDirective({ selector: 'some-directive', inputs: ['some-input', 'some-other-input'] });
 *
 */
export function MockDirective(options: Directive): Directive {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  metadata.outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Directive(metadata)(Mock as any);
}
