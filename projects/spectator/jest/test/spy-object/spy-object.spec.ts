import { createSpyObject } from '@ngneat/spectator/jest';

import { Person } from '../../../test/spy-object/person';

describe('SpyObject', () => {
  it('should mock all public methods', () => {
    const person = createSpyObject(Person);

    person.sayHi.andReturn('Bye!');
  });

  it('should keep getters/setters', () => {
    const person = createSpyObject(Person);
    person.birthYear = 1990;
    jest.spyOn(person, 'age', 'get').mockReturnValue(29);

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
