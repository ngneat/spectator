import { HostComponent } from './host-component';
import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { isType } from '../types';
import { SpectatorOptions } from './options';
import { initialBaseModule } from '../base/initial-base-module';
import { SpectatorModuleMetadata } from './module-metadata';
import { BaseModuleMetadata } from '../base/base-module-metadata';

const defaultOptions: Partial<SpectatorOptions<unknown, HostComponent>> = {
  shallow: false,
  host: HostComponent,
  declareComponent: true
};

export function initialModule<Component, Host = HostComponent>(typeOrOptions: SpectatorOptions<Component, Host> | Type<Component>): SpectatorModuleMetadata<Component, Host> {
  let moduleMetadata: BaseModuleMetadata;
  let component;
  let host;

  if (isType(typeOrOptions)) {
    moduleMetadata = initialBaseModule();
    component = typeOrOptions;
    host = HostComponent;

    moduleMetadata.declarations.push(component);
  } else {
    const options = Object.assign({}, defaultOptions, typeOrOptions);

    moduleMetadata = initialBaseModule(options);
    component = options.component;
    host = options.host;

    if (options.declareComponent) {
      moduleMetadata.declarations.push(component);
    }

    moduleMetadata.schemas = [options.shallow ? NO_ERRORS_SCHEMA : options.schemas || []];
  }

  moduleMetadata.declarations.push(host);

  return {
    ...moduleMetadata,
    component,
    host
  };
}
