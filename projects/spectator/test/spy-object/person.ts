export class Person {
  public readonly name: string = 'Some name';
  public birthYear = 1990;

  public sayHi(): string {
    return 'Hi!';
  }

  public get age(): number {
    return 2019 - this.birthYear;
  }
}
