import { createHostFactory, createServiceFactory, createComponentFactory, Spectator, SpectatorService } from '@ngneat/spectator';
import { InjectionToken, AbstractType } from '@angular/core';

import { ConsumerService } from './consumer.service';
import { AbstractQueryService, QueryService } from './query.service';
import { ZippyComponent } from './zippy/zippy.component';
import { WidgetService } from './widget.service';

const MY_TOKEN = new InjectionToken<AbstractQueryService>('some-token');

describe('Injection tokens', () => {
  describe('with Spectator using get', () => {
    const createComponent = createComponentFactory({
      component: ZippyComponent,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    let spectator: Spectator<ZippyComponent>;

    beforeEach(() => (spectator = createComponent()));

    it('should get by concrete class', () => {
      const service = spectator.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = spectator.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = spectator.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });
  });

  describe('with SpectatorHost using get', () => {
    const createHost = createHostFactory({
      component: ZippyComponent,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    let host: Spectator<ZippyComponent>;

    beforeEach(() => (host = createHost('<zippy></zippy>')));

    it('should get by concrete class', () => {
      const service = host.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = host.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = host.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = host.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = host.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });
  });

  describe('with Service using get', () => {
    let spectator: SpectatorService<ConsumerService>;
    const createService = createServiceFactory({
      service: ConsumerService,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    beforeEach(() => (spectator = createService()));

    it('should get by concrete class', () => {
      const service = spectator.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = spectator.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = spectator.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });
  });

  describe('with Spectator using inject', () => {
    const createComponent = createComponentFactory({
      component: ZippyComponent,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    let spectator: Spectator<ZippyComponent>;

    beforeEach(() => (spectator = createComponent()));

    it('should get by concrete class', () => {
      const service = spectator.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = spectator.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = spectator.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });
  });

  describe('with SpectatorHost using inject', () => {
    const createHost = createHostFactory({
      component: ZippyComponent,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    let host: Spectator<ZippyComponent>;

    beforeEach(() => (host = createHost('<zippy></zippy>')));

    it('should get by concrete class', () => {
      const service = host.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = host.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = host.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = host.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = host.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      host.inject(WidgetService).get.reset(); // should compile and exist
    });
  });

  describe('with Service using inject', () => {
    let spectator: SpectatorService<ConsumerService>;
    const createService = createServiceFactory({
      service: ConsumerService,
      mocks: [WidgetService],
      providers: [
        QueryService,
        {
          provide: AbstractQueryService,
          useExisting: QueryService
        },
        {
          provide: MY_TOKEN,
          useExisting: QueryService
        }
      ]
    });

    beforeEach(() => (spectator = createService()));

    it('should get by concrete class', () => {
      const service = spectator.inject(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by abstract class as token', () => {
      const service = spectator.inject(AbstractQueryService);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });

    it('should get by injection token', () => {
      const service = spectator.inject(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.inject<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
      spectator.inject(WidgetService).get.reset(); // should compile and exist
    });
  });
});
