import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { DomSpectator } from '../base/dom-spectator';
import { setProps } from '../internals/query';
import { SpyObject } from '../mock';
import { Token } from '../token';
import { InferSignalInputs, InputSignalInput } from '../types';

/**
 * @publicApi
 */
export class Spectator<C> extends DomSpectator<C> {
  constructor(public fixture: ComponentFixture<C>, public debugElement: DebugElement, protected instance: C, public element: HTMLElement) {
    super(fixture, debugElement, instance, element);
  }

  public get component(): C {
    return this.instance;
  }

  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(token) as SpyObject<T>;
    }

    return super.inject(token);
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  public setInput<K extends keyof C>(input: InferSignalInputs<C>): void;
  public setInput<K extends keyof C>(input: K, inputValue: InputSignalInput<C[K]>): void;
  public setInput(input: any, value?: any): void {
    setProps(this.fixture.componentRef, input, value);
    // Force cd on the tested component
    this.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    // Force cd on the host component for cases such as: https://github.com/ngneat/spectator/issues/539
    this.detectChanges();
  }
}
