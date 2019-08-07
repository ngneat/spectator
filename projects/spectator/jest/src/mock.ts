import { Provider } from '@angular/core';
import { CompatibleSpy, SpyObject as BaseSpyObject, installProtoMethods, InjectableType } from '@netbasal/spectator';

export type SpyObject<T> = BaseSpyObject<T> & { [P in keyof T]: T[P] & (T[P] extends (...args: any[]) => infer R ? jest.Mock<R> : T[P]) };

export function createSpyObject<T>(type: InjectableType<T>, template?: Partial<Record<keyof T, any>>): SpyObject<T> {
  const mock: any = template || {};

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

export function mockProvider<T>(type: InjectableType<T>, properties?: Partial<Record<keyof T, any>>): Provider {
  return {
    provide: type,
    useFactory: function() {
      return createSpyObject(type, properties);
    }
  };
}
