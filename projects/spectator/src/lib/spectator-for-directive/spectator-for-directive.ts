import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { setProps } from '../internals/query';
import { Token } from '../token';
import { DomSpectator } from '../base/dom-spectator';
import { SpyObject } from '../mock';
import { HostComponent } from '../spectator-with-host/host-component';

/**
 * @publicApi
 */
export class SpectatorForDirective<D, H = HostComponent> extends DomSpectator<D> {
  constructor(
    public hostComponent: H,
    public fixture: ComponentFixture<H>,
    public debugElement: DebugElement,
    protected instance: D,
    public element: Element
  ) {
    super(fixture, debugElement, instance, element);
  }

  public get directive(): D {
    return this.instance;
  }

  public get<T>(type: Token<T> | Token<any>, fromDirectiveInjector: boolean = false): SpyObject<T> {
    if (fromDirectiveInjector) {
      return this.debugElement.injector.get(type) as SpyObject<T>;
    }

    return super.get(type);
  }

  public setHostInput<K extends keyof H>(input: Partial<H>): void;
  public setHostInput<K extends keyof H>(input: K, inputValue: H[K]): void;
  public setHostInput<K extends keyof H>(input: Partial<H> | K, value?: H[K]): void {
    setProps(this.hostComponent, input, value);
    this.detectChanges();
  }
}
