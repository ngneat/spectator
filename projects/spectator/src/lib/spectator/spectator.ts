import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';
import { DomSpectator } from '../base/dom-spectator';

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

  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(type) as SpyObject<T>;
    }

    return super.get(type);
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }
}
