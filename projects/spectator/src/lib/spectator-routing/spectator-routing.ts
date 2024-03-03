import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Event, Router, UrlSegment } from '@angular/router';

import { Spectator } from '../spectator/spectator';

import { ActivatedRouteStub } from './activated-route-stub';
import { RouteOptions } from './route-options';
import { isRouterStub } from './router-stub';

/**
 * @publicApi
 */
export class SpectatorRouting<C> extends Spectator<C> {
  constructor(
    fixture: ComponentFixture<any>,
    debugElement: DebugElement,
    instance: C,
    public readonly router: Router,
    public readonly activatedRouteStub?: ActivatedRouteStub,
  ) {
    super(fixture, debugElement, instance, debugElement.nativeElement);
  }

  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  public triggerNavigation(options?: RouteOptions): void {
    if (!this.checkStubPresent()) {
      return;
    }

    if (options && options.params) {
      this.activatedRouteStub.setParams(options.params);
    }

    if (options && options.queryParams) {
      this.activatedRouteStub.setQueryParams(options.queryParams);
    }

    if (options && options.data) {
      this.activatedRouteStub.setAllData(options.data);
    }

    if (options && options.fragment) {
      this.activatedRouteStub.setFragment(options.fragment);
    }

    this.triggerNavigationAndUpdate();
  }

  /**
   * Updates the route params and triggers a route navigation.
   */
  public setRouteParam(name: string, value: string): void {
    if (this.checkStubPresent()) {
      this.activatedRouteStub.setParam(name, value);
      this.triggerNavigationAndUpdate();
    }
  }

  /**
   * Updates the route query params and triggers a route navigation.
   */
  public setRouteQueryParam(name: string, value: string): void {
    if (this.checkStubPresent()) {
      this.activatedRouteStub.setQueryParam(name, value);
      this.triggerNavigationAndUpdate();
    }
  }

  /**
   * Updates the route data and triggers a route navigation.
   * The `value` is typed as `any` since the `Route#data` is a record with `any` values.
   * There's no sense to make it generic until `Route#data` starts supporting generic types.
   */
  public setRouteData(name: string, value: any): void {
    if (this.checkStubPresent()) {
      this.activatedRouteStub.setData(name, value);
      this.triggerNavigationAndUpdate();
    }
  }

  /**
   * Updates the route fragment and triggers a route navigation.
   */
  public setRouteFragment(fragment: string | null): void {
    if (this.checkStubPresent()) {
      this.activatedRouteStub.setFragment(fragment);
      this.triggerNavigationAndUpdate();
    }
  }

  /**
   * Updates the route url and triggers a route navigation.
   */
  public setRouteUrl(url: UrlSegment[]): void {
    if (this.checkStubPresent()) {
      this.activatedRouteStub.setUrl(url);
      this.triggerNavigationAndUpdate();
    }
  }

  /**
   * Emits a router event
   */
  public emitRouterEvent(event: Event): void {
    if (!isRouterStub(this.router)) {
      // eslint-disable-next-line no-console
      console.warn(
        'No stub for Router present. Set Spectator option "stubsEnabled" to true if you want to use this ' +
          'helper, or use Router navigation to trigger events.',
      );

      return;
    }

    this.router.emitRouterEvent(event);
  }

  private triggerNavigationAndUpdate(): void {
    this.activatedRouteStub!.triggerNavigation();
    this.detectChanges();
  }

  private checkStubPresent(): this is { readonly activatedRouteStub: ActivatedRouteStub } {
    if (!this.activatedRouteStub) {
      // eslint-disable-next-line no-console
      console.warn(
        'No stub for ActivatedRoute present. Set Spectator option "stubsEnabled" to true if you want to use this ' +
          'helper, or use Router to trigger navigation.',
      );

      return false;
    }

    return true;
  }
}
