import { Type, NgModule, Provider } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as customMatchers from './matchers';
import { Spectator } from './internals';
import { initialModule, SpectatorOptions } from './config';
import { CreateComponentOptions, isType } from './types';

export function createTestComponentFactory<Component>(typeOrOptions: SpectatorOptions<Component> | Type<Component>): (options?: CreateComponentOptions<Component>) => Spectator<Component> {
  const {
    component,
    moduleMetadata: { entryComponents, componentProviders, imports },
    moduleMetadata
  } = initialModule<Component>(typeOrOptions);

  const factoryCD = isType(typeOrOptions) || typeOrOptions.detectChanges === undefined ? true : typeOrOptions.detectChanges;

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);

    @NgModule({ entryComponents })
    class EntryComponentModule {}

    entryComponents.length && imports.push(EntryComponentModule);

    if (componentProviders.length) {
      TestBed.configureTestingModule(moduleMetadata)
        .overrideComponent(component, {
          set: {
            providers: componentProviders
          }
        })
        .compileComponents();
    } else {
      TestBed.configureTestingModule(moduleMetadata).compileComponents();
    }
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
    spectator.fixture = TestBed.createComponent(component);
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
