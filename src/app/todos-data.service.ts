import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap } from "rxjs/operators";
import { defer } from "rxjs";

export class UserService {
  getUser() {
    return defer(() => Promise.resolve({}));
  }
}

@Injectable()
export class TodosDataService {
  constructor(private http: HttpClient, private userService: UserService) {}

  get() {
    return this.http.get("url");
  }

  post(id: number) {
    return this.http.post("url", { id });
  }

  twoRequests() {
    return this.http.post("one", {}).pipe(
      concatMap(() => {
        return this.http.get("two");
      })
    );
  }

  requestWithExternalService() {
    return this.userService.getUser().pipe(
      concatMap(() => {
        return this.http.get("two");
      })
    );
  }
}
