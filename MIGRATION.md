# Spectator v3.x to v4 - Migration Guide

**Spectator 4 has arrived!** While this is a major version change (from 3.x to 4.x), we've tried our best to keep breaking changes to a minimum. However, in order to deliver new features and to keep our API as clean as possible, there are some changes required.

## Why upgrading? :thinking:

Short answer: to benefit from fixes and new features, you should upgrade to the newest version of Spectator. Spectator 4 has much to offer:

* Routing support
* Improved support for Directives
* Cleaner and more consistent API
* Improved factories for Services and HTTP
* Angular 8 / Jasmine 3 support
* Global query support

Please head to the [CHANGELOG](CHANGELOG.md) for a complete list of changes.

## Migration Script

For some of the changes, we created a migration script. After installing Spectator v4, just run:

```bash
$ node node_modules/@ngneat/spectator/migrate.js
```

This will apply some of the migration changes to your `*.spec.ts` files.

## BREAKING CHANGES :x:

Let's first discuss what we changed or removed. You will need to make these changes in order to use Spectator 4.

### Moved from `@netbasal/spectator` to `@ngneat/spectator`

We moved this library from `@netbasal` to the `@ngneat` scope. Please update your imports accordingly.

### Spectator overrides

We changed the signature of the factories `Spectator` and `SpectatorWithHost` (now called `SpectatorHost`) to accept an object with override options.

:x: Before:

```ts
const spectator = createComponent({ foo: 'bar' }, false);
```
```ts
const host = createHost('<some-component></some-component>', false, { foo: 'bar' });
```

:white_check_mark: After:

```ts
const spectator = createComponent({
  props: { foo: 'bar' },
  detectChanges: false
});
```
```ts
const spectator = createHost('<some-component></some-component>', {
  props: { foo: 'bar' },
  detectChanges: false
});
```

### Removed matchers

The following matchers were deprecated in v3 and have been removed in v4:

* :x: `toHaveAttr` (in favour of :white_check_mark: `toHaveAttribute`)
* :x: `toHaveProp` (in favour of :white_check_mark: `toHaveProperty`)

### Removed `spectator.getDirectiveInstance()`

:x: Before:

```ts
const fooDirective = spectator.getDirectiveInstance(FooDirective);
```

:white_check_mark: After:

```ts
const fooDirective = spectator.queryHost(FooDirective);
```
```ts
const fooDirective = spectator.queryHost('.some-element', { read: FooDirective });
```

### Removed `spectator.$$('.some-selector')`

For global queries, we removed the `spectator.$$('.some-selector')` method.
 
Please use `spectator.query('.some-selector', { root: true })` instead.

### Removed `patchElementFocus` method.

### Removed `MockComponent` and `MockDirective`

The `MockComponent` and `MockDirective` were deprecated in v3 and have been removed in v4. Please use the corresponding mock functions from the `ng-mocks` library.

### Component Providers

In Spectator v3.x, due to a bug, all components default `providers` were removed by default.

As of Spectator 4, the component providers are only replaced if you explicitly specify them using `componentProviders`.

## DEPRECATIONS :warning:

Let's now discuss what we have deprecated, but not completely removed. Before Spectator releases v5, you will need to remove and replace all use of the following functionality:

### Factory names

We changed the names of the following factories functions and their corresponding interfaces.

Before:

| Function name:                         | Returning a factory for:      |
|----------------------------------------|-------------------------------|
| `createTestComponentFactory` :warning: | `Spectator`                   |
| `createHostComponentFactory` :warning: | `SpectatorWithHost` :warning: |
| `createHTTPFactory` :warning:          | `SpectatorHTTP` :warning:     |

After:

| Function name:           | Returning a factory for: |
|--------------------------|--------------------------|
| `createComponentFactory` :white_check_mark: | `Spectator`              |
| `createHostFactory` :white_check_mark:     | `SpectatorHost` :white_check_mark:         |
| `createHttpFactory` :white_check_mark:     | `SpectatorHttp` :white_check_mark:         |

We did this in order to be consistent with the new factories we introduced:

| Function name:           | Returning a factory for: |
|--------------------------|--------------------------|
| `createDirectiveFactory` :sunglasses: | `SpectatorDirective` :sunglasses:     |
| `createRoutingFactory` :sunglasses:   | `SpectatorRouting` :sunglasses:       |
| `createServiceFactory` :sunglasses:   | `SpectatorService` :sunglasses:       |

### Deprecated `SpectatorHTTP` in favour of `SpectatorHttp`

The new `SpectatorHttp` has a more consistent API and supports more options, like mocks, entry components, etc.

We also deprecated the `dataService` property in favour of `service`;

:warning: Before:

```ts
const http = createHTTPFactory(SomeService);

it('...', () => {
  const { dataService, get } = http();
  dataService.foo();
});
```

:white_check_mark: After:

```ts
const createHttp = createHttpFactory(SomeService);
let spectator: SpectatorHttp<SomeService>;

beforeEach(() => spectator = createHttp());

it('...', () => {
  spectator.service.foo();
});
```

### Deprecated `createService` in favour of `createServiceFactory`

Instead of creating a service with `createService`, we recommend you to use the new `createServiceFactory` which supports more options, like mocks, entry components, etc.

:warning: Before:

```ts
const service = createService(SomeService);

it('...', () => {
  service.foo();
});
```

:white_check_mark: After:

```ts
const createService = createServiceFactory(SomeService);
let spectator: SpectatorService<SomeService>;

beforeEach(() => spectator = createService());

it('...', () => {
  spectator.service.foo();
});
```

## RECOMMENDATIONS

### Use `createDirectiveFactory` for directives :sunglasses:

Spectator 4 has a special factory for directives. The previously recommended way was to use `createHostComponentFactory` for that. While this is still perfectly supported (using `createHostFactory`), we recommend to use the new `createDirectiveFactory` instead to benefit from better semantics and a better query strategy.

