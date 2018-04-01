/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';

export const enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export class SpectatorHTTP<T> {
  httpClient: HttpClient;
  controller: HttpTestingController;
  dataService: T;
  expectOne: (url: string, method: HTTPMethod) => TestRequest;
}

export function createHTTPFactory<T>(dataService: Type<T>, providers = []) {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [dataService, ...providers]
      });
    })
  );

  afterEach(() => {
    TestBed.get(HttpTestingController).verify();
  });

  return () => {
    const http = new SpectatorHTTP<T>();
    http.controller = TestBed.get(HttpTestingController);
    http.dataService = TestBed.get(dataService);
    http.httpClient = TestBed.get(HttpClient);

    http.expectOne = (url: string, method: HTTPMethod) => {
      const req = http.controller.expectOne(url);
      expect(req.request.method).toEqual(method);
      return req;
    };

    return http;
  };
}
