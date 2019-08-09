import { convertToParamMap, ActivatedRoute, ActivatedRouteSnapshot, Data, Params, ParamMap } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteOptions } from './route-options';

/**
 * @publicApi
 *
 * Utility class for stubbing ActivatedRoute of @angular/router
 */
export class ActivatedRouteStub extends ActivatedRoute {
  private testParams: Params = {};
  private testQueryParams: Params = {};
  private testData: Data = {};

  private paramsSubject = new ReplaySubject(1);
  private queryParamsSubject = new ReplaySubject(1);
  private dataSubject = new ReplaySubject(1);

  constructor(options?: RouteOptions) {
    super();

    if (options) {
      this.testParams = options.params || {};
      this.testQueryParams = options.queryParams || {};
      this.testData = options.data || {};
    }

    this.params = this.paramsSubject.asObservable();
    this.queryParams = this.queryParamsSubject.asObservable();
    this.data = this.dataSubject.asObservable();

    this.triggerNavigation();
  }

  get paramMap(): Observable<ParamMap> {
    return this.paramsSubject.asObservable().pipe(map(params => convertToParamMap(params)));
  }

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot = new ActivatedRouteSnapshot();

    snapshot.params = this.testParams;
    snapshot.queryParams = this.testQueryParams;
    snapshot.data = this.testData;

    return snapshot;
  }

  setParams(params: Params) {
    this.testParams = params;
  }

  setParam(name: string, value: string) {
    this.testParams = { ...this.testParams, [name]: value };
  }

  setQueryParams(queryParams: Params) {
    this.testQueryParams = queryParams;
  }

  setQueryParam(name: string, value: string) {
    this.testQueryParams = { ...this.testQueryParams, [name]: value };
  }

  setAllData(data: Data) {
    this.testData = data;
  }

  setData(name: string, value: string) {
    this.testData = { ...this.testData, [name]: value };
  }

  get children(): ActivatedRouteStub[] {
    return [this];
  }

  get parent(): ActivatedRouteStub {
    return this;
  }

  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  triggerNavigation(): void {
    this.paramsSubject.next(this.testParams);
    this.queryParamsSubject.next(this.testQueryParams);
    this.dataSubject.next(this.testData);
  }

  toString(): string {
    return 'activatedRouteStub';
  }
}
