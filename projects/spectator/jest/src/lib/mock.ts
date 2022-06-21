/// <reference types="jest" />

import { FactoryProvider, AbstractType, Type } from '@angular/core';
import { installProtoMethods, CompatibleSpy, SpyObject as BaseSpyObject } from '@ngneat/spectator';
import { jest } from '@jest/globals'

export type SpyObject<T> = BaseSpyObject<T> & { [P in keyof T]: T[P] & (T[P] extends (...args: any[]) => infer R ? jest.Mock<R> : T[P]) };

/**
 * @publicApi
 */
export function createSpyObject<T>(type: Type<T> | AbstractType<T>, template?: Partial<Record<keyof T, any>>): SpyObject<T> {
  const mock: any = { ...template } || {};

  installProtoMethods(mock, type.prototype, () => {
    const jestFn = jest.fn();
    const newSpy: CompatibleSpy = jestFn as any;

    newSpy.andCallFake = (fn: Function) => {
      jestFn.mockImplementation(fn as (...args: any[]) => any);

      return newSpy;
    };

    newSpy.andReturn = (val: any) => {
      jestFn.mockReturnValue(val);
    };

    newSpy.reset = () => {
      jestFn.mockReset();
    };

    return newSpy;
  });

  return mock;
}

/**
 * @publicApi
 */
export function mockProvider<T>(type: Type<T> | AbstractType<T>, properties?: Partial<Record<keyof T, any>>): FactoryProvider {
  return {
    provide: type,
    useFactory: () => createSpyObject(type, properties)
  };
}
