---
id: mocking-providers
title: Mocking Providers
---

For every Spectator factory, we can easily mock any provider.

Every service that we pass to the `mocks` property will be mocked using the `mockProvider()` function.
The `mockProvider()` function converts each method into a Jasmine spy. (i.e `jasmine.createSpy()`).

Here are some of the methods it exposes:

```ts
dateService.isExpired.and.callThrough();
dateService.isExpired.and.callFake(() => fake);
dateService.isExpired.and.throwError('Error');
dateService.isExpired.andCallFake(() => fake);
```
However, if you use Jest as test framework and you want to utilize its mocking mechanism instead, import the `mockProvider()` from `@ngneat/spectator/jest`.
This will automatically use the `jest.fn()` function to create a Jest compatible mock instead.

`mockProvider()` doesn't include properties. In case you need to have properties on your mock you can use 2nd argument:
```ts
const createService = createServiceFactory({
  service: AuthService,
  providers: [
    mockProvider(OtherService, {
      name: 'Martin',
      emitter: new Subject(),
      mockedMethod: () => 'mocked'
    })
  ],
});
```
