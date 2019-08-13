import { createSpyObject } from '@netbasal/spectator';

import { Person } from './person';

describe('SpyObject', () => {
  it('should mock all public methods', () => {
    const person = createSpyObject(Person);

    person.sayHi.andReturn('Bye!');
  });

  it('should enable spying on properties', () => {
    const person = createSpyObject(Person);
    person.birthYear = 1990;
    spyOnProperty(person, 'age', 'get').and.returnValue(29);

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
