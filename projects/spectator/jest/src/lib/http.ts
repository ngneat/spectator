import { FactoryProvider, Type } from '@angular/core';
import { createHTTPFactory as baseCreateHTTPFactory, SpectatorHTTP } from '@ngneat/spectator';

/**
 * @deprecated Deprecated in favour of createHttpFactory
 */
export function createHTTPFactory<T>(dataService: Type<T>, providers: FactoryProvider[] = []): () => SpectatorHTTP<T> {
  return baseCreateHTTPFactory(dataService, providers) as () => SpectatorHTTP<T>;
}
