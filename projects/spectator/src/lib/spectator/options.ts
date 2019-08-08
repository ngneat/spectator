import { Type } from '@angular/core';
import { HostComponent } from './host-component';
import { SpectatorBaseOptions } from '../base/options';

export interface SpectatorOptions<T = any, H = HostComponent> extends SpectatorBaseOptions {
  component: Type<T>;
  shallow?: boolean;
  host?: Type<H>;
  componentProviders?: any[];
  detectChanges?: boolean;
  declareComponent?: boolean;
}
