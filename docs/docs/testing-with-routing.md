## Testing with Routing
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


### Routing Options

The `createRoutesFactory` function can take the following options, on top of the default Spectator options:

* `params`: initial params to use in `ActivatedRoute` stub
* `queryParams`: initial query params to use in `ActivatedRoute` stub
* `data`: initial data to use in `ActivatedRoute` stub
* `fragment`: initial fragment to use in `ActivatedRoute` stub
* `stubsEnabled` (default: `true`): enables the `ActivatedRoute` stub, if set to `false` it uses `RouterTestingModule` instead
* `routes`: if `stubsEnabled` is set to false, you can pass a `Routes` configuration for `RouterTestingModule`
