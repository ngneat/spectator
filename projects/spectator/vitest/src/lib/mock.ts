import { FactoryProvider, AbstractType, Type } from '@angular/core';
import { installProtoMethods, CompatibleSpy, SpyObject as BaseSpyObject } from '@ngneat/spectator';
import { Mock, vi } from 'vitest';

export type SpyObject<T> = BaseSpyObject<T> & {
  [P in keyof T]: T[P] & (T[P] extends (...args: any[]) => infer R ? (R extends (...args: any[]) => any ? Mock<R> : Mock<T[P]>) : T[P]);
};

/**
 * @publicApi
 */
export function createSpyObject<T>(type: Type<T> | AbstractType<T>, template?: Partial<Record<keyof T, any>>): SpyObject<T> {
  const mock: any = { ...template };

  installProtoMethods(mock, type.prototype, () => {
    const viFn = vi.fn();
    const newSpy: CompatibleSpy = viFn as any;

    newSpy.andCallFake = (fn: Function) => {
      viFn.mockImplementation(fn as (...args: any[]) => any);

      return newSpy;
    };

    newSpy.andReturn = (val: any) => {
      viFn.mockReturnValue(val);
    };

    newSpy.reset = () => {
      viFn.mockReset();
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
    useFactory: () => createSpyObject(type, properties),
  };
}
