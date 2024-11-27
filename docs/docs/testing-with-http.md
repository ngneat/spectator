---
id: testing-with-http 
title: Testing With Http 
---

Spectator makes testing data services, which use the Angular HTTP module, a lot easier. For example, let's say that you have service with three methods, one performs a `GET`, one a `POST` and one performs
concurrent requests:

```ts
export class TodosDataService {
  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get('api/todos');
  }

  postTodo(id: number) {
    return this.httpClient.post('api/todos', { id });
  }

  collectTodos() {
    return merge(
      this.http.get('/api1/todos'),
      this.http.get('/api2/todos')
    );
  }
}
```

The test for the above service should look like:
```ts
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { TodosDataService } from './todos-data.service';

describe('HttpClient testing', () => {
  let spectator: SpectatorHttp<TodosDataService>;
  const createHttp = createHttpFactory(TodosDataService);

  beforeEach(() => spectator = createHttp());

  it('can test HttpClient.get', () => {
    spectator.service.getTodos().subscribe();
    spectator.expectOne('api/todos', HttpMethod.GET);
  });

  it('can test HttpClient.post', () => {
    spectator.service.postTodo(1).subscribe();

    const req = spectator.expectOne('api/todos', HttpMethod.POST);
    expect(req.request.body['id']).toEqual(1);
  });

  it('can test current http requests', () => {
    spectator.service.collectTodos().subscribe();
    const reqs = spectator.expectConcurrent([
        { url: '/api1/todos', method: HttpMethod.GET },
        { url: '/api2/todos', method: HttpMethod.GET }
    ]);

    spectator.flushAll(reqs, [{}, {}, {}]);
  });
});
```
We need to create an HTTP factory by using the `createHttpFactory()` function, passing the service that you want to test. The `createHttpFactory()` returns a function which can be called to get an instance of SpectatorHttp with the following properties:
- `controller` - A proxy for Angular `HttpTestingController`
- `httpClient` - A proxy for Angular `HttpClient`
- `service` - The service instance
- `inject()` - A proxy for Angular `TestBed.inject()`
- `expectOne()` - Expect that a single request was made which matches the given URL and it's method, and return its mock request
