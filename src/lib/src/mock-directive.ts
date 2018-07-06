import { Directive, EventEmitter, Type } from '@angular/core';

/**
 * Examples:
 * MockDirective({ selector: 'some-directive' });
 * MockDirective({ selector: 'some-directive', inputs: ['some-input', 'some-other-input'] });
 *
 */
export function MockDirective(options: Directive & { identifier?: Type<any> }): Directive {
  const metadata: Directive & { identifier?: Type<any> } = {
    selector: options.selector,
    identifier: options.identifier,
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  metadata.outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  if (options.identifier) {
    metadata.providers = [{ provide: options.identifier, useClass: Mock }];
  }

  return Directive(metadata)(Mock as any);
}
