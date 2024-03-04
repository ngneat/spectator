import { ActivatedRouteStub } from '../../src/lib/spectator-routing/activated-route-stub';
import { RouteOptions } from '../../src/lib/spectator-routing/route-options';
import { UrlSegment } from '@angular/router';

describe('ActivatedRouteStub', () => {
  it('should fill the Snapshot with empty values it no options are provided', () => {
    const activatedRouteStub = new ActivatedRouteStub();
    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { params, queryParams, data, fragment, url } = activatedRouteStub.snapshot;

    expect(params).toEqual({});
    expect(queryParams).toEqual({});
    expect(data).toEqual({});
    expect(fragment).toBeNull();
    expect(url).toEqual([]);
  });

  it('should fill the Snapshot with values from given option object', () => {
    const urlSegment = new UrlSegment('test', {});

    const routeOptions: RouteOptions = {
      params: {
        test: 'test',
      },
      queryParams: {
        test: 'test',
      },
      data: {
        test: 'test',
      },
      fragment: 'test',
      url: [urlSegment],
    };

    const activatedRouteStub = new ActivatedRouteStub(routeOptions);
    expect(activatedRouteStub.snapshot).not.toBeNull();
    const { params, queryParams, data, fragment, url } = activatedRouteStub.snapshot;

    expect(params).toEqual({
      test: 'test',
    });
    expect(queryParams).toEqual({
      test: 'test',
    });
    expect(data).toEqual({
      test: 'test',
    });
    expect(fragment).toEqual('test');
    expect(url).toContain(urlSegment);
  });

  it('should update params in snapshot when set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setParams({
      test: 'test',
    });

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { params } = activatedRouteStub.snapshot;

    expect(params).toEqual({
      test: 'test',
    });
  });

  it('should update params in snapshot when single param is set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setParam('test', 'test');

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { params } = activatedRouteStub.snapshot;

    expect(params).toEqual({
      test: 'test',
    });
  });

  it('should update queryparams in snapshot when set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setQueryParams({
      test: 'test',
    });

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { queryParams } = activatedRouteStub.snapshot;

    expect(queryParams).toEqual({
      test: 'test',
    });
  });

  it('should update queryparams in snapshot when single queryparam is set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setQueryParam('test', 'test');

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { queryParams } = activatedRouteStub.snapshot;

    expect(queryParams).toEqual({
      test: 'test',
    });
  });

  it('should update data in snapshot when set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setAllData({
      test: 'test',
    });

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { data } = activatedRouteStub.snapshot;

    expect(data).toEqual({
      test: 'test',
    });
  });

  it('should update data in snapshot when single data is set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setData('test', 'test');

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { data } = activatedRouteStub.snapshot;

    expect(data).toEqual({
      test: 'test',
    });
  });

  it('should update data in snapshot with any type of value', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setData('movieName', 'Avengers');
    activatedRouteStub.setData('countries', ['USA', 'Canada']);
    activatedRouteStub.setData('animal', { type: 'dog' });

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { data } = activatedRouteStub.snapshot;

    expect(data).toEqual({
      movieName: 'Avengers',
      countries: ['USA', 'Canada'],
      animal: {
        type: 'dog',
      },
    });
  });

  it('should update fragment in snapshot when set', () => {
    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setFragment('test');

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { fragment } = activatedRouteStub.snapshot;

    expect(fragment).toEqual('test');
  });

  it('should update URL in snapshot when single data is set', () => {
    const urlSegment = new UrlSegment('test', {});

    const activatedRouteStub = new ActivatedRouteStub();

    activatedRouteStub.setUrl([urlSegment]);

    expect(activatedRouteStub.snapshot).not.toBeNull();

    const { url } = activatedRouteStub.snapshot;

    expect(url).toContain(urlSegment);
  });
});
