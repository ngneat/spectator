import { createSpyObject } from '@ngneat/spectator';

import { Person } from './person';

describe('SpyObject', () => {
  it('should mock all public methods', () => {
    const person = createSpyObject(Person);

    // Check methods without arguments but returns
    person.sayHi.andReturn('Bye!');

    // Check methods with arguments
    person.saySomething.andReturn('');
    person.saySomething.withArgs('Testing').and.returnValue('You said: Testing');
    person.saySomething.andCallFake((something: string) => {
      return `You said: ${something}`;
    });

    // Check pure void methods
    person.voidMethod.andCallFake(() => {});

    // Check void methods with arguments
    person.voidMethodWithArguments.andCallFake((arg1: string, arg2: number) => {
      // Do nothing
    });
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
