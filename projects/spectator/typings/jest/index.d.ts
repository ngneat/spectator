/**
 * This file was creating to avoid conflicts during building between jasmine and jest.
 *
 * Projects using @netbasal/spectator should just use either @types/jasmine or @types/jest.
 */

declare namespace jest {
  interface Mock<T = {}> extends Function, MockInstance<T> {
    new (...args: any[]): T;

    (...args: any[]): any;
  }

  function fn<T>(implementation?: (...args: any[]) => any): Mock<T>;

  interface MockInstance<T> {
    mockImplementation(fn?: (...args: any[]) => any): Mock<T>;

    mockReturnValue(value: any): Mock<T>;

    mockReset(): void;
  }
}
