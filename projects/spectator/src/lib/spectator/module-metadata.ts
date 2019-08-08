import { Type } from '@angular/core';
import { BaseModuleMetadata } from '../base/base-module-metadata';
import { HostComponent } from './host-component';

export interface SpectatorModuleMetadata<Component = any, Host = HostComponent> extends BaseModuleMetadata {
  component: Type<Component>;
  host: Type<Host>;
}
