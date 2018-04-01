/** Credit: Valentin Buryakov */
import { Provider, Type } from '@angular/core';

export interface CompatibleSpy extends jasmine.Spy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value. */
  andReturn(val: any): void;

  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function. */
  andCallFake(fn: Function): CompatibleSpy;

  /** removes all recorded calls */
  reset();
}

export type SpyObject<T> = T & { [P in keyof T]: T[P] & CompatibleSpy };

export function createSpyObject<T>(type: Type<T>): SpyObject<T> {
  const mock: any = {};

  function createGuinnessCompatibleSpy(name): CompatibleSpy {
    const newSpy: CompatibleSpy = jasmine.createSpy(name) as any;
    newSpy.andCallFake = <any>newSpy.and.callFake;
    newSpy.andReturn = <any>newSpy.and.returnValue;
    newSpy.reset = <any>newSpy.calls.reset;
    // revisit return null here (previously needed for rtts_assert).
    newSpy.and.returnValue(null);
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
    useFactory: () => createSpyObject(type)
  };
}
