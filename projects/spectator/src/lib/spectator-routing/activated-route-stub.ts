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
  private testFragment: string | null = null;

  private readonly paramsSubject = new ReplaySubject<Params>(1);
  private readonly queryParamsSubject = new ReplaySubject<Params>(1);
  private readonly dataSubject = new ReplaySubject<Data>(1);
  private readonly fragmentSubject = new ReplaySubject<string | null>(1);

  constructor(options?: RouteOptions) {
    super();

    if (options) {
      this.testParams = options.params || {};
      this.testQueryParams = options.queryParams || {};
      this.testData = options.data || {};
      this.testFragment = options.fragment || null;
    }

    this.params = this.paramsSubject.asObservable();
    this.queryParams = this.queryParamsSubject.asObservable();
    this.data = this.dataSubject.asObservable();
    this.fragment = this.fragmentSubject.asObservable() as Observable<string>;

    this.triggerNavigation();
  }

  public get paramMap(): Observable<ParamMap> {
    return this.paramsSubject.asObservable().pipe(map(params => convertToParamMap(params)));
  }

  public get snapshot(): ActivatedRouteSnapshot {
    const snapshot = new ActivatedRouteSnapshot();

    snapshot.params = this.testParams;
    snapshot.queryParams = this.testQueryParams;
    snapshot.data = this.testData;
    snapshot.fragment = this.testFragment!;

    return snapshot;
  }

  public setParams(params: Params): void {
    this.testParams = params;
  }

  public setParam(name: string, value: string): void {
    this.testParams = { ...this.testParams, [name]: value };
  }

  public setQueryParams(queryParams: Params): void {
    this.testQueryParams = queryParams;
  }

  public setQueryParam(name: string, value: string): void {
    this.testQueryParams = { ...this.testQueryParams, [name]: value };
  }

  public setAllData(data: Data): void {
    this.testData = data;
  }

  public setData(name: string, value: string): void {
    this.testData = { ...this.testData, [name]: value };
  }

  public setFragment(fragment: string | null): void {
    this.testFragment = fragment;
  }

  public get children(): ActivatedRouteStub[] {
    return [this];
  }

  public get parent(): ActivatedRouteStub {
    return this;
  }

  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  public triggerNavigation(): void {
    this.paramsSubject.next(this.testParams);
    this.queryParamsSubject.next(this.testQueryParams);
    this.dataSubject.next(this.testData);
    this.fragmentSubject.next(this.testFragment);
  }

  public toString(): string {
    return 'activatedRouteStub';
  }
}
