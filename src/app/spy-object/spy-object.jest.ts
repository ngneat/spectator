import { createSpyObject } from '@netbasal/spectator/jest';

import { Person } from './person';

describe('SpyObject', () => {
  it('should mock all public methods', () => {
    const person = createSpyObject(Person);

    person.sayHi.andReturn('Bye!');
  });

  it('should keep getters/setters', () => {
    const person = createSpyObject(Person);
    person.birthYear = 1990;

    expect(person.age).toBe(29);

    jest.spyOn(person, 'age', 'get').mockReturnValue(100);

    expect(person.age).toBe(100);
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
