import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { Spectator } from '../spectator/spectator';

import { ActivatedRouteStub } from './activated-route-stub';
import { RouteOptions } from './route-options';

/**
 * @publicApi
 */
export class SpectatorWithRouting<C> extends Spectator<C> {
  constructor(fixture: ComponentFixture<any>, debugElement: DebugElement, private activatedRouteStub: ActivatedRouteStub) {
    super(fixture, debugElement, debugElement.componentInstance, debugElement.nativeElement);
  }

  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  triggerNavigation(options?: RouteOptions): void {
    if (options && options.params) {
      this.activatedRouteStub.setParams(options.params);
    }

    if (options && options.queryParams) {
      this.activatedRouteStub.setQueryParams(options.queryParams);
    }

    if (options && options.data) {
      this.activatedRouteStub.setAllData(options.data);
    }

    this.triggerNavigationAndUpdate();
  }

  /**
   * Updates the route params and triggers a route navigation.
   */
  setRouteParam(name: string, value: string): void {
    this.activatedRouteStub.setParam(name, value);
    this.triggerNavigationAndUpdate();
  }

  /**
   * Updates the route query params and triggers a route navigation.
   */
  setRouteQueryParam(name: string, value: string): void {
    this.activatedRouteStub.setQueryParam(name, value);
    this.triggerNavigationAndUpdate();
  }

  /**
   * Updates the route data and triggers a route navigation.
   */
  setRouteData(name: string, value: string): void {
    this.activatedRouteStub.setData(name, value);
    this.triggerNavigationAndUpdate();
  }

  private triggerNavigationAndUpdate(): void {
    this.activatedRouteStub.triggerNavigation();
    this.detectChanges();
  }
}
