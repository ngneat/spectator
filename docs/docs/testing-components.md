---
id: testing-components
title: Testing Components
---

Create a component factory by using the `createComponentFactory()` function, passing the component class that you want to test.
The `createComponentFactory()` returns a function that will create a fresh component in each `it` block:

```ts
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className] input', () => {
    spectator.setInput('className', 'danger');
    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });
});
```

The `createComponentFactory` function can optionally take the following options which extends the basic Angular Testing Module options:

```ts
const createComponent = createComponentFactory({
  component: ButtonComponent,
  imports: [],
  providers: [],
  declarations: [],
  entryComponents: [],
  componentProviders: [], // Override the component's providers
  componentViewProviders: [], // Override the component's view providers
  componentImports: [], // Override the component's imports in case of testing standalone component
  overrideModules: [], // Override modules
  overrideComponents: [], // Override components in case of testing standalone 
  mocks: [], // Providers that will automatically be mocked
  componentMocks: [], // Component providers that will automatically be mocked
  componentViewProvidersMocks: [], // Component view providers that will be automatically mocked
  detectChanges: false, // Defaults to true
  declareComponent: false, // Defaults to true
  disableAnimations: false, // Defaults to true
  shallow: true, // Defaults to false
  errorOnUnknownElements: true, // Defaults to false
  errorOnUnknownProperties: true, // Defaults to false
});
```

The `createComponent()` function optionally takes the following options:
```ts
it('should...', () => {
  spectator = createComponent({
    // The component inputs
    props: {
      title: 'Click'
    },
    // Override the component's providers
    providers: [],
    // Whether to run change detection (defaults to true)
    detectChanges: false
  });

  expect(spectator.query('button')).toHaveText('Click');
});
```

By providing `overrideComponents` options in scope of our `createComponent()` function we can define the way of overriding standalone component and it's dependencies
```ts
@Component({
  selector: `app-standalone-with-import`,
  template: `<div id="standalone">Standalone component with import!</div>
  <app-standalone-with-dependency></app-standalone-with-dependency>`,
  imports: [StandaloneComponentWithDependency],
  standalone: true,
})
export class StandaloneWithImportsComponent {}

@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standaloneWithDependency">Standalone component with dependency!</div>`,
  standalone: true,
})
export class StandaloneComponentWithDependency {
  constructor(public query: QueryService) {}
}

@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standaloneWithDependency">Standalone component with override dependency!</div>`,
  standalone: true,
})
export class MockStandaloneComponentWithDependency {
  constructor() {}
}

it('should...', () => {
  const spectator = createHostFactory({
    component: StandaloneWithImportsComponent,
    template: `<div><app-standalone-with-import></app-standalone-with-import></div>`,
    overrideComponents: [
      [
        StandaloneWithImportsComponent,
        {
          remove: { imports: [StandaloneComponentWithDependency] },
          add: { imports: [MockStandaloneComponentWithDependency] },
        },
      ],
    ],
  });

  expect(host.query('#standalone')).toContainText('Standalone component with import!');
  expect(host.query('#standaloneWithDependency')).toContainText('Standalone component with override dependency!');
});

```

By passing `componentImports` config to our `createComponent()` function we can remove and override imports directly in the tested standalone component. The `componentImports` property accepts an array of overrides. An override is an array of length 2, where the first entry is the original import to be removed from the tested component during the test and the second entry is the replacement import. In the example below, `StandaloneComponentWithDependency` is removed from the tested component, and `MockStandaloneComponentWithDependency` is added to the tested component imports.
```ts
@Component({
  selector: `app-standalone-with-import`,
  template: `<div id="standalone">Standalone component with import!</div>
  <app-standalone-with-dependency></app-standalone-with-dependency>`,
  imports: [StandaloneComponentWithDependency],
  standalone: true,
})
export class StandaloneWithImportsComponent {}

@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standaloneWithDependency">Standalone component with dependency!</div>`,
  standalone: true,
})
export class StandaloneComponentWithDependency {
  constructor(public query: QueryService) {}
}

@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standaloneWithDependency">Standalone component with override dependency!</div>`,
  standalone: true,
})
export class MockStandaloneComponentWithDependency {
  constructor() {}
}

it('should...', () => {
  const spectator = createHostFactory({
    component: StandaloneWithImportsComponent,
    template: `<div><app-standalone-with-import></app-standalone-with-import></div>`,
    componentImports: [
      [
        StandaloneComponentWithDependency,
        MockStandaloneComponentWithDependency,
      ],
    ],
  });

  expect(host.query('#standalone')).toContainText('Standalone component with import!');
  expect(host.query('#standaloneWithDependency')).toContainText('Standalone component with override dependency!');
});
```

The `createComponent()` method returns an instance of `Spectator` which exposes the following properties:

- `fixture` - The tested component's fixture
- `component` - The tested component's instance
- `element` - The tested component's native element
- `debugElement` - The tested fixture's debug element

And the following methods:

### `inject()`
Provides a wrapper for Ivy's `TestBed.inject()`:

```ts
const service = spectator.inject(QueryService);

const fromComponentInjector = true;
const service = spectator.inject(QueryService, fromComponentInjector);
```

### `detectChanges()`
Runs `detectChanges` on the tested element/host:

```ts
spectator.detectChanges();
```

### `setInput()`
Changes the value of an `@Input()` of the tested component:

```ts
it('should...', () => {
  spectator.setInput('className', 'danger');

  spectator.setInput({
    className: 'danger'
  });
});
```
### `output()`
Returns an observable `@Output()` of the tested component:

```ts
it('should emit the $event on click', () => {
  let output;
  spectator.output('click').subscribe(result => (output = result));

  spectator.component.onClick({ type: 'click' });
  expect(output).toEqual({ type: 'click' });
});
```

### `tick(millis?: number)`
Run the fakeAsync `tick()` function and call `detectChanges()`:

```ts
it('should work with tick', fakeAsync(() => {
  spectator = createComponent(ZippyComponent);
  spectator.component.update();
  expect(spectator.component.updatedAsync).toBeFalsy();
  spectator.tick(6000);
  expect(spectator.component.updatedAsync).not.toBeFalsy();
}))
```

## Component Providers

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
spectator.inject(FooService, true)
```

In the same way you can also override the component view providers by using the `componentViewProviders` and `componentViewProvidersMocks`.

The same rules also apply to directives using the `directiveProviders` and `directiveMocks` parameters.

## Override Modules

Use `overrideModules` option to override modules.

For Example:

```ts
createComponentFactory({
  component: SomeComponent,
  overrideModules: [
    [SomeModule, {set: {declarations: [SomeOtherComponent]} }],
    [SomeOtherModule, {set: {declarations: [SomeOtherComponent]} }]
  ]
})
```

cf. https://angular.io/api/core/testing/TestBed#overrideModule
