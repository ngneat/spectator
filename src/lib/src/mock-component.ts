import { Component, EventEmitter } from '@angular/core';

/**
 * Examples:
 * MockComponent({ selector: 'some-component' });
 * MockComponent({ selector: 'some-component', inputs: ['some-input', 'some-other-input'] });
 *
 */
export function MockComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '<ng-content></ng-content>',
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  metadata.outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Component(metadata)(Mock as any);
}
