import { Provider, Type } from '@angular/core';
import { CompatibleSpy, SpyObject as BaseSpyObject } from '@netbasal/spectator';

export type SpyObject<T> = BaseSpyObject<T> & { [P in keyof T]: T[P] & jest.Mock<T> };

export function createSpyObject<T>(type: Type<T>): SpyObject<T> {
  const mock: any = {};

  function createGuinnessCompatibleSpy(name): CompatibleSpy {
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
  }

  function installProtoMethods(proto: any) {
    if (proto === null || proto === Object.prototype) {
      return;
    }

    for (const key of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (typeof descriptor.value === 'function' && key !== 'constructor') {
        mock[key] = createGuinnessCompatibleSpy(key);
      }
    }

    installProtoMethods(Object.getPrototypeOf(proto));
  }

  installProtoMethods(type.prototype);

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
