import { Component } from '@angular/core';
import { SpectatorHost, createHostFactory, createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { AutoFocusDirective } from '../../test/auto-focus.directive';

@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  public isFocused = false;
}

describe('DatoAutoFocusDirective', () => {
  let host: SpectatorHost<AutoFocusDirective, CustomHostComponent>;

  const createHost = createHostFactory({
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
  let host: SpectatorDirective<AutoFocusDirective, CustomHostComponent>;

  const createHost = createDirectiveFactory({
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
