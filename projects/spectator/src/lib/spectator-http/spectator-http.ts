import { HttpClient } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { BaseSpectator } from '../base/base-spectator';

/**
 * @publicApi
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  JSONP = 'JSONP',
  OPTIONS = 'OPTIONS'
}

/**
 * @publicApi
 */
export class SpectatorHttp<S> extends BaseSpectator {
  constructor(public dataService: S, public httpClient: HttpClient, public controller: HttpTestingController) {
    super();

    // small workaround to prevent issues if destructuring SpectatorHttp, which was common in Spectator 3
    // remove in v5?
    this.expectOne = this.expectOne.bind(this);
  }

  public expectOne(url: string, method: HttpMethod): TestRequest {
    expect(true).toBe(true); // workaround to avoid `Spec has no expectations` https://github.com/NetanelBasal/spectator/issues/75

    const req = this.controller.expectOne({
      url,
      method
    });

    // assert that there are no outstanding requests.
    this.controller.verify();

    return req;
  }
}
