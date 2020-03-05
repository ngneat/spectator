import { TestBed, TestBedStatic } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';
import { Type, InjectionToken, AbstractType } from '@angular/core';

/**
 * @internal
 */
export abstract class BaseSpectator {
  /**
   * @deprecated Deprecated in favour of inject(). Will be removed once TestBed.get is discontinued.
   * @param type Token
   */
  public get<T>(type: Token<T> | Token<any>): SpyObject<T> {
    return TestBed.get(type);
  }

  public inject<T>(token: Token<T>): SpyObject<T> {
    return (<any>TestBed).inject ? ((<any>TestBed).inject(token) as SpyObject<T>) : TestBed.get(token);
  }
}
