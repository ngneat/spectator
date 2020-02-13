import { TestBed } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';

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

  public inject<T>(type: Token<T> | Token<any>): SpyObject<T> {
    return TestBed.inject(type);
  }
}
