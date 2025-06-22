import { createSpyObject } from '@ngneat/spectator';

import { Person } from './person';

describe('SpyObject', () => {
  it('should mock all public methods', () => {
    const person = createSpyObject(Person);

    // Check methods without arguments but returns
    person.sayHi.andReturn('Bye!');

    // Check method with different return types
    // These shouldn not compile, but will with `@ts-expect-error` applied
    // @ts-expect-error
    person.sayHi.andReturn(false);
    // @ts-expect-error
    person.sayHi.andReturn(100);
    // @ts-expect-error
    person.sayHi.andReturn({ prop: true });
    // @ts-expect-error
    person.sayHi.andCallFake((): boolean => {
      return false;
    });
    // @ts-expect-error
    person.sayHi.andCallFake((): number => {
      return 100;
    });
    // @ts-expect-error
    person.sayHi.andCallFake((): { prop: boolean } => {
      return { prop: true };
    });

    // Check methods with arguments
    person.saySomething.andReturn('');
    person.saySomething.withArgs('Testing').and.returnValue('You said: Testing');
    person.saySomething.andCallFake((something: string) => {
      return `You said: ${something}`;
    });

    // Check method with different return types
    // These shouldn not compile, but will with `@ts-expect-error` applied
    // @ts-expect-error
    person.saySomething.andReturn(false);
    // @ts-expect-error
    person.saySomething.andReturn(100);
    // @ts-expect-error
    person.saySomething.andReturn({ prop: true });
    // @ts-expect-error
    person.saySomething.andCallFake((str: string): boolean => {
      return false;
    });
    // @ts-expect-error
    person.saySomething.andCallFake((str: string): number => {
      return 100;
    });
    // @ts-expect-error
    person.saySomething.andCallFake((str: string): { prop: boolean } => {
      return { prop: true };
    });
    // @ts-expect-error
    person.saySomething.andCallFake((num: number): string => {
      return 'Wrong Argument Type';
    });
    // @ts-expect-error
    person.saySomething.andCallFake((bool: boolean): string => {
      return 'Wrong Argument Type';
    });

    // Check pure void methods
    person.voidMethod.andCallFake(() => {});

    // Check method with different return types
    // These shouldn not compile, but will with `@ts-expect-error` applied
    // @ts-expect-error
    person.voidMethod.andReturn(false);
    // @ts-expect-error
    person.voidMethod.andReturn(100);
    // @ts-expect-error
    person.voidMethod.andReturn({ prop: true });

    // These compile because a void method's return type isn't checked by the compiler
    person.voidMethod.andCallFake((): boolean => {
      return false;
    });
    person.voidMethod.andCallFake((): number => {
      return 100;
    });
    person.voidMethod.andCallFake((): { prop: boolean } => {
      return { prop: true };
    });

    // Check void methods with arguments
    person.voidMethodWithArguments.andCallFake((arg1: string, arg2: number) => {
      // Do nothing
    });

    // Check methods with different argument and return types
    // These shouldn not compile, but will with `@ts-expect-error` applied
    // @ts-expect-error
    person.voidMethod.andReturn(false);
    // @ts-expect-error
    person.voidMethod.andReturn(100);
    // @ts-expect-error
    person.voidMethod.andReturn({ prop: true });
    // @ts-expect-error
    person.voidMethodWithArguments.andCallFake((arg1: string, arg2: string) => {});
    // @ts-expect-error
    person.voidMethodWithArguments.andCallFake((arg1: number, arg2: string) => {});

    // These compile because an empty argument list is valid in Typescript.
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-with-fewer-parameters-assignable-to-functions-that-take-more-parameters
    person.voidMethodWithArguments.andCallFake(() => {});
  });

  it('should enable spying on properties', () => {
    const person = createSpyObject(Person);
    person.birthYear = 1990;
    spyOnProperty(person, 'age', 'get').and.returnValue(29);

    expect(person.age).toBe(29);
  });

  it('should enable setting properties by just assigning', () => {
    const person = createSpyObject(Person);
    person.birthYear = 1990;
    (person as any).age = 29;

    expect(person.age).toBe(29);
  });

  it('should allow setting properties', () => {
    const person = createSpyObject(Person);

    person.birthYear = 1995; // should compile
  });

  it('should allow setting readonly properties with cast method', () => {
    const person = createSpyObject(Person);

    person.castToWritable().name = 'Other name'; // should compile

    expect(person.name).toBe('Other name');
  });
});
