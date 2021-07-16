# Breaking Changes

## Version 8
- Upgrade to v12
- Remove deprecated mocks helpers
- Remove downlevel-dts
- Updates schematics and support the `type` option

## Version 7
- Add support for Angular v11 

## Version 6
- Wrapper for `TestBed.get()` was removed, please use `inject()`
- `createHTTPFactory` was removed in favor of `createHttpFactory`
- `SpectatorWithHost` type was removed in favor of `SpectatorHost`
- `createTestComponentFactory` was removed in favor of `createComponentFactory`
- `createService` was removed in favor of `createServiceFactory`
- `createHostComponentFactory` was removed in favor of `createHostFactory`
- Removed deprecated `dataService` option from `SpectatorHttpOptions` type. Please use `service` instead of `dataService`
- 

## Version 5
- Angular v8 is a `peerDependency`
