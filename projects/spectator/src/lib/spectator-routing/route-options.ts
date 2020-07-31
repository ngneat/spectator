import { Data, Params, UrlSegment } from '@angular/router';
import { ActivatedRouteStub } from './activated-route-stub';

export interface RouteOptions {
  params?: Params;
  queryParams?: Params;
  data?: Data;
  fragment?: string | null;
  url?: UrlSegment[];
  root?: ActivatedRouteStub | null;
  parent?: ActivatedRouteStub | null;
  firstChild?: ActivatedRouteStub | null;
  children?: ActivatedRouteStub[] | null;
}
