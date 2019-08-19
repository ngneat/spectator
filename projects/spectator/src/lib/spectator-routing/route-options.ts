import { Data, Params } from '@angular/router';

export interface RouteOptions {
  params?: Params;
  queryParams?: Params;
  data?: Data;
  fragment?: string | null;
}
