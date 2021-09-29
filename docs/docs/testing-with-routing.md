---
id: testing-with-routing
title: Testing With Routing
---

For components which use routing, there is a special factory available that extends the default one, and provides a stubbed `ActivatedRoute` so that you can configure additional routing options.

```ts
describe('ProductDetailsComponent', () => {
  let spectator: SpectatorRouting<ProductDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: ProductDetailsComponent,
    params: { productId: '3' },
    data: { title: 'Some title' }
  });

  beforeEach(() => spectator = createComponent());

  it('should display route data title', () => {
    expect(spectator.query('.title')).toHaveText('Some title');
  });

  it('should react to route changes', () => {
    spectator.setRouteParam('productId', '5');

     // your test here...
  });
});
```

### Triggering a navigation
The `SpectatorRouting` API includes convenient methods for updating the current route:

```ts
interface SpectatorRouting<C> extends Spectator<C> {
  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  triggerNavigation(options?: RouteOptions): void;

  /**
   * Updates the route params and triggers a route navigation.
   */
  setRouteParam(name: string, value: string): void;

  /**
   * Updates the route query params and triggers a route navigation.
   */
  setRouteQueryParam(name: string, value: string): void;

  /**
   * Updates the route data and triggers a route navigation.
   */
  setRouteData(name: string, value: string): void;

  /**
   * Updates the route fragment and triggers a route navigation.
   */
  setRouteFragment(fragment: string | null): void;
}
```

### Integration testing with `RouterTestingModule`

If you set the `stubsEnabled` option to `false`, you can pass a real routing configuration
and setup an integration test using the `RouterTestingModule` from Angular.

Note that this requires promises to resolve. One way to deal with this, is by making your test async:

```ts
describe('Routing integration test', () => {
  const createComponent = createRoutingFactory({
    component: MyComponent,
    declarations: [OtherComponent],
    stubsEnabled: false,
    routes: [
      {
        path: '',
        component: MyComponent
      },
      {
        path: 'foo',
        component: OtherComponent
      }
    ]
  });

  it('should navigate away using router link', async () => {
    const spectator = createComponent();

    // wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the current route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/');

    // click on a router link
    spectator.click('.link-1');

    // don't forget to wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the new route by asserting the location
    expect(spectator.inject(Location).path()).toBe('/foo');
  });
});
```


### Routing Options

The `createRoutesFactory` function can take the following options, on top of the default Spectator options:

* `params`: initial params to use in `ActivatedRoute` stub
* `queryParams`: initial query params to use in `ActivatedRoute` stub
* `data`: initial data to use in `ActivatedRoute` stub
* `url`: initial URL segments to use in `ActivatedRoute` stub
* `root`: the value for `root` for the `ActivatedRoute` stub
* `parent`: the value for `parent` for the `ActivatedRoute` stub
* `children`: the value for `children` for the `ActivatedRoute` stub
* `firstChild`: the value for `firstChild` for the `ActivatedRoute` stub
* `fragment`: initial fragment to use in `ActivatedRoute` stub
* `stubsEnabled` (default: `true`): enables the `ActivatedRoute` stub
* `routes`: if `stubsEnabled` is set to false, you can pass a `Routes` configuration for `RouterTestingModule`
