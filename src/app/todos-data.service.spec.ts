import { TodosDataService, UserService } from "./todos-data.service";
import { createHTTPFactory, HTTPMethod } from "../lib/src/http";
import { mockProvider } from "../lib/src";
import { defer } from "rxjs/observable/defer";
import { fakeAsync, tick } from "@angular/core/testing";

describe("HttpClient testing", () => {
  let http = createHTTPFactory<TodosDataService>(TodosDataService, [
    mockProvider(UserService)
  ]);

  it("can test HttpClient.get", () => {
    let { dataService, controller, expectOne } = http();

    dataService.get().subscribe();
    expectOne("url", HTTPMethod.GET);
  });

  it("can test HttpClient.post", () => {
    let { dataService, controller, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne("url", HTTPMethod.POST);
    expect(req.request.body["id"]).toEqual(1);
  });

  it("should test two requests", () => {
    let { dataService, controller, expectOne } = http();

    dataService.twoRequests().subscribe();
    const req = expectOne("one", HTTPMethod.POST);
    req.flush({});
    expectOne("two", HTTPMethod.GET);
  });

  it(
    "should work with external service",
    fakeAsync(() => {
      let { dataService, controller, expectOne, get } = http();
      get(UserService).getUser.andCallFake(() => {
        return defer(() => Promise.resolve({}));
      });

      const req = dataService.requestWithExternalService().subscribe();
      tick();

      expectOne("two", HTTPMethod.GET);
    })
  );
});
