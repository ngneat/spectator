import { convertToParamMap, ActivatedRoute, ActivatedRouteSnapshot, Data, Params, ParamMap, UrlSegment } from '@angular/router';
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
  private testUrl: UrlSegment[] = [];
  private testRoot: ActivatedRouteStub | null = null;
  private testParent: ActivatedRouteStub | null = null;
  private testFirstChild: ActivatedRouteStub | null = null;
  private testChildren: ActivatedRouteStub[] | null = null;

  private readonly paramsSubject = new ReplaySubject<Params>(1);
  private readonly queryParamsSubject = new ReplaySubject<Params>(1);
  private readonly dataSubject = new ReplaySubject<Data>(1);
  private readonly fragmentSubject = new ReplaySubject<string | null>(1);
  private readonly urlSubject = new ReplaySubject<UrlSegment[]>(1);

  constructor(options?: RouteOptions) {
    super();

    if (options) {
      this.testParams = options.params || {};
      this.testQueryParams = options.queryParams || {};
      this.testData = options.data || {};
      this.testFragment = options.fragment || null;
      this.testUrl = options.url || [];
      this.testRoot = options.root || null;
      this.testParent = options.parent || null;
      this.testFirstChild = options.firstChild || null;
      this.testChildren = options.children || null;
    }

    this.params = this.paramsSubject.asObservable();
    this.queryParams = this.queryParamsSubject.asObservable();
    this.data = this.dataSubject.asObservable();
    this.fragment = this.fragmentSubject.asObservable() as Observable<string>;
    this.url = this.urlSubject.asObservable() as Observable<UrlSegment[]>;

    this.snapshot = this.buildSnapshot();

    this.triggerNavigation();
  }

  public get paramMap(): Observable<ParamMap> {
    return this.paramsSubject.asObservable().pipe(map((params) => convertToParamMap(params)));
  }

  public snapshot: ActivatedRouteSnapshot;

  public setParams(params: Params): void {
    this.testParams = params;
    this.snapshot = this.buildSnapshot();
  }

  public setParam(name: string, value: string): void {
    this.testParams = { ...this.testParams, [name]: value };
    this.snapshot = this.buildSnapshot();
  }

  public setQueryParams(queryParams: Params): void {
    this.testQueryParams = queryParams;
    this.snapshot = this.buildSnapshot();
  }

  public setQueryParam(name: string, value: string): void {
    this.testQueryParams = { ...this.testQueryParams, [name]: value };
    this.snapshot = this.buildSnapshot();
  }

  public setAllData(data: Data): void {
    this.testData = data;
    this.snapshot = this.buildSnapshot();
  }

  public setData(name: string, value: any): void {
    this.testData = { ...this.testData, [name]: value };
    this.snapshot = this.buildSnapshot();
  }

  public setFragment(fragment: string | null): void {
    this.testFragment = fragment;
    this.snapshot = this.buildSnapshot();
  }

  public setUrl(url: UrlSegment[]): void {
    this.testUrl = url;
    this.snapshot = this.buildSnapshot();
  }

  public get root(): ActivatedRouteStub {
    return this.testRoot || this;
  }

  public get parent(): ActivatedRouteStub | null {
    return this.testParent || null;
  }

  public get children(): ActivatedRouteStub[] {
    return this.testChildren || [this];
  }

  public get firstChild(): ActivatedRouteStub | null {
    return this.testFirstChild || null;
  }

  /**
   * Simulates a route navigation by updating the Params, QueryParams and Data observable streams.
   */
  public triggerNavigation(): void {
    this.paramsSubject.next(this.testParams);
    this.queryParamsSubject.next(this.testQueryParams);
    this.dataSubject.next(this.testData);
    this.fragmentSubject.next(this.testFragment);
    this.urlSubject.next(this.testUrl);
  }

  public toString(): string {
    return 'activatedRouteStub';
  }

  private buildSnapshot(): ActivatedRouteSnapshot {
    const snapshot = new ActivatedRouteSnapshot();

    snapshot.params = this.testParams;
    snapshot.queryParams = this.testQueryParams;
    snapshot.data = this.testData;
    snapshot.fragment = this.testFragment!;
    snapshot.url = this.testUrl;

    return snapshot;
  }
}
