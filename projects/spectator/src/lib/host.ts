import { DebugElement, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { _getChildren, _setInput, Spectator } from './internals';
import * as customMatchers from './matchers';
import { DOMSelector } from './dom-selectors';
import { HostComponent, initialModule, SpectatorOptions } from './config';
import { Token } from './token';
import { CreateComponentOptions, isString, isType, QueryOptions, QueryType } from './types';

export class SpectatorWithHost<C, H = HostComponent> extends Spectator<C> {
  hostComponent: H;
  /** We need a different property when there is an host because it's different type */
  hostFixture: ComponentFixture<H>;
  hostElement: HTMLElement;
  hostDebugElement: DebugElement;

  private _debugElement: DebugElement;
  get debugElement() {
    return this._debugElement || this.hostDebugElement;
  }

  set debugElement(value) {
    this._debugElement = value;
  }

  /**
   * Run detect changes on the host component
   */
  detectChanges() {
    this.hostFixture.detectChanges();
  }

  queryHost<R extends Element>(selector: string | DOMSelector, options?: { root: boolean }): R;
  queryHost<R>(directive: Type<R>): R;
  queryHost<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R;
  queryHost<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return document.querySelector(directiveOrSelector) as any;
    }
    return _getChildren<R>(this.hostDebugElement)(directiveOrSelector, options)[0] || null;
  }

  queryHostAll<R extends Element[]>(selector: string | DOMSelector, options?: { root: boolean }): R[];
  queryHostAll<R>(directive: Type<R>): R[];
  queryHostAll<R>(directiveOrSelector: Type<any> | string, options: { read: Token<R> }): R[];
  queryHostAll<R>(directiveOrSelector: QueryType, options?: QueryOptions<R>): R[] {
    if ((options || {}).root && isString(directiveOrSelector)) {
      return Array.from(document.querySelectorAll(directiveOrSelector)) as any[];
    }
    return _getChildren<R>(this.hostDebugElement)(directiveOrSelector, options);
  }

  setHostInput<K extends keyof H>(input: Partial<H>);
  setHostInput<K extends keyof H>(input: K, inputValue: H[K]);
  setHostInput<K extends keyof H>(input: Partial<H> | K, inputValue?: H[K]) {
    _setInput(input, inputValue, this.hostComponent);
    this.hostFixture.detectChanges();
  }

  getDirectiveInstance<T>(directive: Type<T>, all?: false): T;
  getDirectiveInstance<T>(directive: Type<T>, all?: true): T[];
  getDirectiveInstance<T>(directive: Type<T>, all = false): T | T[] {
    if (all) {
      return this.hostFixture.debugElement.queryAll(By.directive(directive)).map(d => d.injector.get(directive));
    }

    return this.hostFixture.debugElement.query(By.directive(directive)).injector.get(directive);
  }
}

export function createHostComponentFactory<Component, Host = HostComponent>(typeOrOptions: SpectatorOptions<Component, Host> | Type<Component>): (template: string, options?: CreateComponentOptions<Component>) => SpectatorWithHost<Component, Host> {
  const { component, moduleMetadata, host } = initialModule<Component, Host>(typeOrOptions, true);

  const factoryCD = isType(typeOrOptions) || typeOrOptions.detectChanges === undefined ? true : typeOrOptions.detectChanges;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);
  });

  return (template: string, options?: CreateComponentOptions<Component>) => {
    const defaults: CreateComponentOptions<Component> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...options };

    if (providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });

    if (moduleMetadata.componentProviders) {
      TestBed.overrideComponent(component, {
        set: {
          providers: [moduleMetadata.componentProviders]
        }
      });
    }

    TestBed.overrideComponent(host, { set: { template: template } });

    const withHost = new SpectatorWithHost<Component, Host>();
    withHost.hostFixture = TestBed.createComponent(host);
    //  The host component instance
    withHost.hostComponent = withHost.hostFixture.componentInstance;
    withHost.hostDebugElement = withHost.hostFixture.debugElement;
    withHost.hostElement = withHost.hostFixture.nativeElement;
    // The tested component debug element
    withHost.debugElement = withHost.hostFixture.debugElement.query(By.directive(component));
    // The tested component instance, rendered inside the host
    if (withHost.debugElement) {
      withHost.component = withHost.debugElement.componentInstance;
      withHost.element = withHost.debugElement.nativeElement;
    }

    if (props) {
      Object.keys(props).forEach(key => {
        withHost.component[key] = props[key];
      });
    }

    if (factoryCD && detectChanges) {
      withHost.hostFixture.detectChanges();
    }

    return withHost;
  };
}
