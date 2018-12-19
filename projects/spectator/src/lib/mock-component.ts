import { Component, EventEmitter, Type } from '@angular/core';

/**
 * Examples:
 * MockComponent({ selector: 'some-component' });
 * MockComponent({ selector: 'some-component', inputs: ['some-input', 'some-other-input'] });
 *
 * @deprecated Deprecated in favour of the `ng-mocks` implementation of `MockComponent`. To be be removed in the next major version.
 */
export function MockComponent(options: Component & { identifier?: Type<any> }): Component {
  const metadata: Component & { identifier?: Type<any> } = {
    selector: options.selector,
    identifier: options.identifier,
    template: options.template || '<ng-content></ng-content>',
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

  return Component(metadata)(Mock as any);
}
