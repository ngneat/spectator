---
id: integration-testing
title: Integration Testing
---

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
    expect(spectator.get(Location).path()).toBe('/');

    // click on a router link
    spectator.click('.link-1');

    // don't forget to wait for promises to resolve...
    await spectator.fixture.whenStable();

    // test the new route by asserting the location
    expect(spectator.get(Location).path()).toBe('/foo');
  });
});
```
