import { Spectator as BaseSpectator, Token } from '@netbasal/spectator';
import { SpyObject } from './mock';

export class Spectator<C> extends BaseSpectator<C> {
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}
