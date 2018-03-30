import { TodosDataService } from './todos-data.service';
import { createHTTPFactory, HTTPMethod } from '../lib/src/http';

describe('HttpClient testing', () => {
  let http = createHTTPFactory<TodosDataService>(TodosDataService);

  it('can test HttpClient.get', () => {
    let { dataService, controller, expectOne } = http();

    dataService.get().subscribe();
    expectOne('url', HTTPMethod.GET);
  });

  it('can test HttpClient.post', () => {
    let { dataService, controller, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne('url', HTTPMethod.POST);
    expect(req.request.body['id']).toEqual(1);

  });
});
