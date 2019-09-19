import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Spectator } from '../spectator/spectator';

import { ActivatedRouteStub } from './activated-route-stub';
import { RouteOptions } from './route-options';

/**
 * @publicApi
 */
export class SpectatorRouting<C> extends Spectator<C> {
  constructor(
    fixture: ComponentFixture<any>,
    debugElement: DebugElement,
    instance: C,
    public readonly router: Router,
    public readonly activatedRouteStub?: ActivatedRouteStub
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
   */
  public setRouteData(name: string, value: string): void {
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

  private triggerNavigationAndUpdate(): void {
    this.activatedRouteStub!.triggerNavigation();
    this.detectChanges();
  }

  private checkStubPresent(): this is { readonly activatedRouteStub: ActivatedRouteStub } {
    if (!this.activatedRouteStub) {
      // tslint:disable-next-line:no-console
      console.warn(
        'No stub for ActivatedRoute present. Set Spectator option "stubsEnabled" to true if you want to use this ' +
          'helper, or use Router to trigger navigation.'
      );

      return false;
    }

    return true;
  }
}
