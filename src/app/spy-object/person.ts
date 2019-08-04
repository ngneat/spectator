export class Person {
  readonly name: string = 'Some name';
  birthYear = 1990;

  sayHi(): string {
    return 'Hi!';
  }

  get age(): number {
    return 2019 - this.birthYear;
  }
}
