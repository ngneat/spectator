import { Router, RouterLink } from '@angular/router';
import { createRoutingFactory } from '@ngneat/spectator/jest';

import { MyPageComponent } from '../../../test/with-routing/my-page.component';

describe('MyPageComponent', () => {
  describe('simple use', () => {
    const createComponent = createRoutingFactory(MyPageComponent);

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.query('.foo')).toExist();
    });
  });

  describe('route options', () => {
    const createComponent = createRoutingFactory({
      component: MyPageComponent,
      data: { title: 'lorem', dynamicTitle: 'ipsum' },
      params: { foo: '1', bar: '2' },
      queryParams: { baz: '3' }
    });

    it('should create with default options', () => {
      const spectator = createComponent();

      expect(spectator.query('.title')).toHaveText('lorem');
      expect(spectator.query('.dynamic-title')).toHaveText('ipsum');

      expect(spectator.query('.foo')).toHaveText('1');
      expect(spectator.query('.bar')).toHaveText('2');
      expect(spectator.query('.baz')).toHaveText('3');
    });

    it('should create with overridden options', () => {
      const spectator = createComponent({
        params: { foo: 'A', bar: 'B' }
      });

      expect(spectator.query('.foo')).toHaveText('A');
      expect(spectator.query('.bar')).toHaveText('B');
      expect(spectator.query('.baz')).toHaveText('3');
    });

    it('should respond to updates', () => {
      const spectator = createComponent({
        params: { foo: 'A', bar: 'B' }
      });

      expect(spectator.query('.foo')).toHaveText('A');
      expect(spectator.query('.bar')).toHaveText('B');
      expect(spectator.query('.baz')).toHaveText('3');

      spectator.setRouteParam('bar', 'X');

      expect(spectator.query('.foo')).toHaveText('A');
      expect(spectator.query('.bar')).toHaveText('X');
      expect(spectator.query('.baz')).toHaveText('3');
      expect(spectator.component.fragment).toBeNull();

      spectator.setRouteQueryParam('baz', 'Y');
      spectator.setRouteFragment('lorem');

      expect(spectator.query('.foo')).toHaveText('A');
      expect(spectator.query('.bar')).toHaveText('X');
      expect(spectator.query('.baz')).toHaveText('Y');
      expect(spectator.component.fragment).toBe('lorem');
    });

    it('should support snapshot data', () => {
      const spectator = createComponent();

      expect(spectator.query('.title')).toHaveText('lorem');
      expect(spectator.query('.dynamic-title')).toHaveText('ipsum');

      spectator.triggerNavigation({
        data: { title: 'new-title', dynamicTitle: 'new-dynamic-title' }
      });

      expect(spectator.query('.title')).toHaveText('lorem');
      expect(spectator.query('.dynamic-title')).toHaveText('new-dynamic-title');
    });
  });

  describe('routerLinks', () => {
    const createComponent = createRoutingFactory(MyPageComponent);

    it('should mock routerLinks', () => {
      const spectator = createComponent();

      // tslint:disable-next-line:no-unnecessary-type-assertion
      const link1 = spectator.query('.link-1', { read: RouterLink })!;

      expect(link1.routerLink).toEqual(['foo']);
    });
  });

  describe('default router mocking', () => {
    const createComponent = createRoutingFactory({
      component: MyPageComponent
    });

    it('should support mocks', () => {
      const spectator = createComponent();

      spectator.click('.link-2');

      expect(spectator.get(Router).navigate).toHaveBeenCalledWith(['bar']);
    });
  });
});
