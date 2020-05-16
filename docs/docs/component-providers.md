---
id: component-providers
title: Component Providers
---

By default, the original component providers (e.g. the `providers` on the `@Component`) are not touched.

However, in most cases, you want to access the component's providers in your test or replace them with mocks.

For example:

```ts
@Component({
  template: '...',
  providers: [FooService]
})
class FooComponent {
  constructor(private fooService: FooService} {}

  // ...
}
```

Use the `componentProviders` to replace the `FooService` provider:

```ts
const createComponent = createComponentFactory({
  component: FooComponent,
  componentProviders: [
    {
      provide: FooService,
      useValue: someThingElse
    }
  ]
})
```

Or mock the service by using `componentMocks`:

```ts
const createComponent = createComponentFactory({
  component: FooComponent,
  componentMocks: [FooService]
});
```

To access the provider, get it from the component injector using the `fromComponentInjector` parameter:

```ts
spectator.get(FooService, true)
```

In the same way you can also override the component view providers by using the `componentViewProviders` and `componentViewProvidersMocks`.

The same rules also apply to directives using the `directiveProviders` and `directiveMocks` parameters.
