import { <%= classify(name)%>Service } from './<%= dasherize(name)%>.service';
import { createHTTPFactory, HTTPMethod } from '@netbasal/spectator';

describe('HttpClient testing', () => {
  const http = createHTTPFactory<<%= classify(name)%>Service>(<%= classify(name)%>Service);

  it('can test HttpClient.get', () => {
    const { dataService, controller, expectOne } = http();

    dataService.get().subscribe();
    expectOne('url', HTTPMethod.GET);
  });

  it('can test HttpClient.post', () => {
    const { dataService, controller, expectOne } = http();

    dataService.post(1).subscribe();

    const req = expectOne('url', HTTPMethod.POST);
    expect(req.request.body['id']).toEqual(1);

  });
});
