import { Component } from '@angular/core';
import { createHostComponentFactory, createHostDirectiveFactory, SpectatorForDirective, SpectatorWithHost } from '@netbasal/spectator';

import { AutoFocusDirective } from './auto-focus.directive';

@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  public isFocused = false;
}

describe('DatoAutoFocusDirective', () => {
  let host: SpectatorWithHost<AutoFocusDirective, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: AutoFocusDirective,
    host: CustomHostComponent
  });

  it('should be focused', () => {
    host = createHost(`<input datoAutoFocus="true">`);
    const instance = host.queryHost(AutoFocusDirective);
    expect(host.element).toBeFocused();
  });

  it('should NOT be focused', () => {
    host = createHost(`<input [datoAutoFocus]="false">`);
    expect(host.element).not.toBeFocused();
  });

  it('should work with dynamic input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);
    expect(host.element).not.toBeFocused();
    host.setHostInput({ isFocused: true });
    expect(host.element).toBeFocused();
  });

  it('should be able to type in input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);

    host.typeInElement('foo');
    expect(host.element).toHaveValue('foo');
  });
});

describe('DatoAutoFocusDirective (createHostDirectiveFactory)', () => {
  let host: SpectatorForDirective<AutoFocusDirective, CustomHostComponent>;

  const createHost = createHostDirectiveFactory({
    directive: AutoFocusDirective,
    host: CustomHostComponent
  });

  it('should be focused', () => {
    host = createHost(`<input datoAutoFocus="true">`);
    const instance1 = host.query(AutoFocusDirective);
    const instance2 = host.directive;
    expect(instance1).toBe(instance2);
    expect(host.element).toBeFocused();
  });

  it('should NOT be focused', () => {
    host = createHost(`<input [datoAutoFocus]="false">`);
    expect(host.element).not.toBeFocused();
  });

  it('should work with dynamic input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);
    expect(host.element).not.toBeFocused();
    host.setHostInput({ isFocused: true });
    expect(host.element).toBeFocused();
  });

  it('should be able to type in input', () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);

    host.typeInElement('foo');
    expect(host.element).toHaveValue('foo');
  });
});
