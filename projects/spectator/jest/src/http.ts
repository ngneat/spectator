import { Type } from '@angular/core';
import { createHTTPFactory as baseCreateHTTPFactory, SpectatorHTTP } from '@netbasal/spectator';

export function createHTTPFactory<T>(dataService: Type<T>, providers = []): () => SpectatorHTTP<T> {
  return baseCreateHTTPFactory(dataService, providers) as () => SpectatorHTTP<T>;
}
