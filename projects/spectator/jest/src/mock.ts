import { Provider, Type } from '@angular/core';
import { CompatibleSpy, SpyObject as BaseSpyObject, installProtoMethods } from '@netbasal/spectator';

export type SpyObject<T> = BaseSpyObject<T> & { [P in keyof T]: T[P] & jest.Mock<T> };

export function createSpyObject<T>(type: Type<T>): SpyObject<T> {
  const mock: any = {};

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

export function mockProvider<T>(type: Type<T>): Provider {
  return {
    provide: type,
    useFactory: function() {
      return createSpyObject(type);
    }
  };
}
