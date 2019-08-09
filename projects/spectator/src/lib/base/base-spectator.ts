import { TestBed } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';

/**
 * @internal
 */
export abstract class BaseSpectator {
  get<T>(type: Token<T> | Token<any>): SpyObject<T> {
    return TestBed.get(type);
  }
}
