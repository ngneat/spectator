import { Data, Params, UrlSegment } from '@angular/router';

export interface RouteOptions {
  params?: Params;
  queryParams?: Params;
  data?: Data;
  fragment?: string | null;
  url?: UrlSegment[];
}
