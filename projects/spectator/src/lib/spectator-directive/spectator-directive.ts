import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { DomSpectator } from '../base/dom-spectator';
import { setProps } from '../internals/query';
import { SpyObject } from '../mock';
import { HostComponent } from '../spectator-host/host-component';
import { Token } from '../token';

/**
 * @publicApi
 */
export class SpectatorDirective<D, H = HostComponent> extends DomSpectator<D> {
  constructor(
    public hostComponent: H,
    public fixture: ComponentFixture<any>,
    public debugElement: DebugElement,
    protected instance: D,
    public element: Element
  ) {
    super(fixture, debugElement, instance, element);
  }

  public get directive(): D {
    return this.instance;
  }

  public inject<T>(token: Token<T>, fromDirectiveInjector: boolean = false): SpyObject<T> {
    if (fromDirectiveInjector) {
      return this.debugElement.injector.get(token) as SpyObject<T>;
    }

    return super.inject(token);
  }

  public setHostInput<K extends keyof H>(input: Partial<H>): void;
  public setHostInput<K extends keyof H>(input: K, inputValue: H[K]): void;
  public setHostInput(input: any, value?: any): void {
    setProps(this.fixture.componentRef, input, value);
    this.detectChanges();
  }
}
