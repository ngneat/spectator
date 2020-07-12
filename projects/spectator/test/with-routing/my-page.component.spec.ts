import { NavigationStart, Router, RouterLink, UrlSegment } from '@angular/router';
import { createRoutingFactory } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { MyPageComponent } from './my-page.component';

describe('MyPageComponent', () => {
  describe('simple use', () => {
    const createComponent = createRoutingFactory(MyPageComponent);

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.query('.foo')).toExist();
    });
  });

  describe('route options', () => {
    const url = [new UrlSegment('/url-path', {})];
    const createComponent = createRoutingFactory({
      component: MyPageComponent,
      data: { title: 'lorem', dynamicTitle: 'ipsum' },
      params: { foo: '1', bar: '2' },
      queryParams: { baz: '3' },
      url: url
    });

    it('should create with default options', () => {
      const spectator = createComponent();

      expect(spectator.query('.title')).toHaveText('lorem');
      expect(spectator.query('.dynamic-title')).toHaveText('ipsum');

      expect(spectator.query('.foo')).toHaveText('1');
      expect(spectator.query('.bar')).toHaveText('2');
      expect(spectator.query('.baz')).toHaveText('3');

      expect(spectator.component.url).toEqual(url);
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

      const url = [new UrlSegment('/url-path', {})];
      spectator.setRouteUrl(url);

      expect(spectator.component.url).toEqual(url);
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

      const link1 = spectator.query('.link-1', { read: RouterLink })!;

      expect(link1.routerLink).toEqual(['/foo']);
    });
  });

  describe('default router mocking', () => {
    const createComponent = createRoutingFactory({
      component: MyPageComponent
    });

    it('should support mocks', () => {
      const spectator = createComponent();

      spectator.click('.link-2');

      expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['bar']);
    });

    it('should trigger router events', async () => {
      const spectator = createComponent();

      const subscriberSpy = jasmine.createSpy('subscriber');
      const subscription = spectator.router.events.subscribe(subscriberSpy);
      spyOn(console, 'warn');

      spectator.emitRouterEvent(new NavigationStart(1, 'some-url'));

      // tslint:disable-next-line:no-console
      expect(console.warn).not.toHaveBeenCalled();
      expect(subscriberSpy).toHaveBeenCalled();

      subscription.unsubscribe();
    });
  });

  describe('without stubs', () => {
    @Component({
      selector: 'dummy',
      template: ''
    })
    class DummyComponent {}

    const createComponent = createRoutingFactory({
      component: MyPageComponent,
      declarations: [DummyComponent],
      stubsEnabled: false,
      routes: [
        {
          path: '',
          component: MyPageComponent
        },
        {
          path: 'foo',
          component: DummyComponent
        }
      ]
    });

    it('should navigate away using router', async () => {
      const spectator = createComponent();

      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/');

      await spectator.router.navigate(['/foo']);
      expect(spectator.inject(Location).path()).toBe('/foo');

      await spectator.router.navigate(['/']);
      expect(spectator.inject(Location).path()).toBe('/');
    });

    it('should navigate away using router link', async () => {
      const spectator = createComponent();

      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/');

      spectator.click('.link-1');

      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/foo');
    });

    it('should not trigger router events', async () => {
      const spectator = createComponent();
      await spectator.fixture.whenStable();

      spyOn(console, 'warn');

      spectator.emitRouterEvent(new NavigationStart(1, 'some-url'));

      // tslint:disable-next-line:no-console
      expect(console.warn).toHaveBeenCalled();
    });
  });
});
