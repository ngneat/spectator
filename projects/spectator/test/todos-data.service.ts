import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defer, Observable, merge } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export class UserService {
  public getUser(): Observable<any> {
    return defer(() => Promise.resolve({}));
  }
}

@Injectable()
export class TodosDataService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
  ) {}

  public get(): Observable<any> {
    return this.http.get('url');
  }

  public post(id: number): Observable<any> {
    return this.http.post('url', { id });
  }

  public twoRequests(): Observable<any> {
    return this.http.post('one', {}).pipe(
      concatMap(() => {
        return this.http.get('two');
      }),
    );
  }

  public concurrentRequests(): Observable<any> {
    return merge(this.http.post('one', {}), this.http.post('two', {}), this.http.post('three', {}));
  }

  public requestWithExternalService(): Observable<any> {
    return this.userService.getUser().pipe(
      concatMap(() => {
        return this.http.get('two');
      }),
    );
  }
}
