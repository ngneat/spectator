export class Person {
  public readonly name: string = 'Some name';
  public birthYear = 1990;

  public sayHi(): string {
    return 'Hi!';
  }

  public saySomething(something: string): string {
    return `You said: ${something}`;
  }

  public voidMethod(): void {
    // Do nothing
  }

  public voidMethodWithArguments(arg1: string, arg2: number): void {
    // Do nothing
  }

  public get age(): number {
    return 2019 - this.birthYear;
  }
}
