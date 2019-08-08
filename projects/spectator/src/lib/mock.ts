/** Credit: Valentin Buryakov */
import { FactoryProvider, Type } from '@angular/core';

type Writable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * @publicApi
 */
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

/**
 * @publicApi
 */
export type SpyObject<T> = T &
  { [P in keyof T]: T[P] extends Function ? T[P] & CompatibleSpy : T[P] } & {
    /** casts to type without readonly properties */
    castToWritable: () => Writable<T>;
  };

/**
 * @internal
 */
export function installProtoMethods(mock: any, proto: any, createSpyFn: Function) {
  if (proto === null || proto === Object.prototype) {
    return;
  }

  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (!descriptor) {
      continue;
    }

    if (typeof descriptor.value === 'function' && key !== 'constructor' && typeof mock[key] === 'undefined') {
      mock[key] = createSpyFn(key);
    } else if (descriptor.get || descriptor.set) {
      Object.defineProperty(mock, key, descriptor);
    }
  }

  installProtoMethods(mock, Object.getPrototypeOf(proto), createSpyFn);

  mock.castToWritable = () => mock;

  return mock;
}

/**
 * @publicApi
 */
export function createSpyObject<T>(type: Type<T>, template?: Partial<Record<keyof T, any>>): SpyObject<T> {
  const mock: any = Object.assign({}, template) || {};

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

/**
 * @publicApi
 */
export function mockProvider<T>(type: Type<T>, properties?: Partial<Record<keyof T, any>>): FactoryProvider {
  return {
    provide: type,
    useFactory: function() {
      return createSpyObject(type, properties);
    }
  };
}

/**
 * @publicApi
 */
export type MockProvider = typeof mockProvider;
