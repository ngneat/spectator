import { AsyncComponent } from "./async.component";
import { SpectatorWithHost } from "../../lib/src";
import { createHostComponentFactory } from "../../lib/src/host";
import { QueryService } from "../query.service";
import { of } from "rxjs";

describe("ZippyComponent", () => {
  let host: SpectatorWithHost<AsyncComponent>;

  const createHost = createHostComponentFactory({
    component: AsyncComponent,
    mocks: [QueryService]
  });

  it("should work", () => {
    const { component } = createHost(`<app-async></app-async>`);
    expect(component).toBeDefined();
  });

  it("should be falsy", () => {
    host = createHost(`<app-async></app-async>`);
    expect(host.query("p")).not.toExist();
  });

  it("should be truthy", () => {
    const host = createHost(`<app-async></app-async>`, false);
    let queryService = host.get<QueryService>(QueryService);
    queryService.select.and.returnValue(of(true));
    host.detectChanges();
    expect(host.query("p")).toExist();
  });
});
