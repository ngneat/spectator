/** Credit: Valentin Buryakov */
import { Provider, Type } from '@angular/core';

export interface CompatibleSpy extends jasmine.Spy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value. */
  andReturn(val: any): void;

  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function. */
  andCallFake(fn: Function): this;

  /** removes all recorded calls */
  reset();
}

export type SpyObject<T> = T & { [P in keyof T]: T[P] & CompatibleSpy };

export function installProtoMethods(mock: any, proto: any, createSpyFn: Function) {
  if (proto === null || proto === Object.prototype) {
    return;
  }

  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (typeof descriptor.value === 'function' && key !== 'constructor' && typeof mock[key] === 'undefined') {
      mock[key] = createSpyFn(key);
    }
  }

  installProtoMethods(mock, Object.getPrototypeOf(proto), createSpyFn);

  return mock;
}

export function createSpyObject<T>(type: Type<T>, template?: Partial<Record<keyof T, any>>): SpyObject<T> {
  const mock: any = template || {};

  return installProtoMethods(mock, type.prototype, name => {
    const newSpy: CompatibleSpy = jasmine.createSpy(name) as any;
    newSpy.andCallFake = <any>newSpy.and.callFake;
    newSpy.andReturn = <any>newSpy.and.returnValue;
    newSpy.reset = <any>newSpy.calls.reset;
    // revisit return null here (previously needed for rtts_assert).
    newSpy.and.returnValue(null);
    return newSpy;
  });
}

export function mockProvider<T>(type: Type<T>, properties?: Partial<Record<keyof T, any>>): Provider {
  return {
    provide: type,
    useFactory: function() {
      return createSpyObject(type, properties);
    }
  };
}
