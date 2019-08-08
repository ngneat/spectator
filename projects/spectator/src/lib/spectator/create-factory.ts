import { Type, Provider } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as customMatchers from '../matchers';
import { Spectator } from './spectator';
import { CreateComponentOptions, isType } from '../types';
import { SpectatorOptions } from './options';
import { initialModule } from './initial-module';

export function createTestComponentFactory<Component>(typeOrOptions: SpectatorOptions<Component> | Type<Component>): (options?: CreateComponentOptions<Component>) => Spectator<Component> {
  const moduleMetadata = initialModule<Component>(typeOrOptions);

  const factoryCD = isType(typeOrOptions) || typeOrOptions.detectChanges === undefined ? true : typeOrOptions.detectChanges;
  const componentProviders = isType(typeOrOptions) ? [] : typeOrOptions.componentProviders || [];

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (componentProviders) {
      TestBed.overrideComponent(moduleMetadata.component, {
        set: {
          providers: componentProviders
        }
      });
    }

    TestBed.compileComponents();
  }));

  return (options?: CreateComponentOptions<Component>) => {
    const defaults: CreateComponentOptions<Component> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...options };

    if (providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    const spectator = new Spectator<Component>();
    spectator.fixture = TestBed.createComponent(moduleMetadata.component);
    spectator.debugElement = spectator.fixture.debugElement;
    // The component instance
    spectator.component = spectator.debugElement.componentInstance;
    // The component native element
    spectator.element = spectator.debugElement.nativeElement;

    Object.keys(props).forEach(input => {
      spectator.component[input] = props[input];
    });

    if (factoryCD && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}
