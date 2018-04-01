import { TodosService } from "./todos.service";
import { createService } from "../lib/src/service";
import { of } from "rxjs/observable/of";

class OtherService {
  add() {}
}

describe("TodosService", () => {
  const spectator = createService({
    service: TodosService,
    mocks: [OtherService]
  });
  // const spectator = createService<TodosService>(TodosService);

  it("should", () => {
    // let otherService = spectator.get<OtherService>(OtherService);
    // otherService.add.andReturn(of(true));
    spectator.service.remove();
  });
});
