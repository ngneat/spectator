import { fakeAsync, tick } from '@angular/core/testing';
import { defer } from 'rxjs';
import { HTTPMethod } from '@ngneat/spectator';
import { createHttpFactory, createHTTPFactory, mockProvider, SpyObject } from '@ngneat/spectator/jest';

import { TodosDataService, UserService } from '../../test/todos-data.service';

describe('HttpClient testing', () => {
  const http = createHttpFactory({
    dataService: TodosDataService,
    mocks: [UserService]
  });

  it('can test HttpClient.get', () => {
    const { dataService, expectOne } = http();

    dataService.get().subscribe();
    expectOne('url', HTTPMethod.GET);
  });

  it('can test HttpClient.post', () => {
    const { dataService, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne('url', HTTPMethod.POST);
    expect(req.request.body.id).toEqual(1);
  });

  it('should test two requests', () => {
    const { dataService, expectOne } = http();

    dataService.twoRequests().subscribe();
    const req = expectOne('one', HTTPMethod.POST);
    req.flush({});
    expectOne('two', HTTPMethod.GET);
  });

  it('should work with external service', fakeAsync(() => {
    const { dataService, expectOne, inject } = http();
    inject<UserService>(UserService).getUser.mockImplementation(() => {
      return defer(() => Promise.resolve({}));
    });

    dataService.requestWithExternalService().subscribe();
    tick();

    expectOne('two', HTTPMethod.GET);
  }));
});
