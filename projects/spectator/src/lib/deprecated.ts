import { Component, EventEmitter, Directive } from '@angular/core';

export function MockComponentDeprecated(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  (metadata as any).outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Component(metadata)(Mock as any);
}

export function MockDirectiveDeprecated(options: Directive): Directive {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs || [],
    exportAs: options.exportAs || ''
  };

  class Mock {}

  (metadata as any).outputs.forEach(method => {
    Mock.prototype[method] = new EventEmitter<any>();
  });

  return Directive(metadata)(Mock as any);
}
