import { ConsumerService } from './consumer.service';
import { createHostComponentFactory, createService, createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { AbstractQueryService, QueryService } from './query.service';
import { InjectionToken } from '@angular/core';
import { ZippyComponent } from './zippy/zippy.component';
import { WidgetService } from './widget.service';

const MY_TOKEN = new InjectionToken<AbstractQueryService>('some-token');

describe('Injection tokens', () => {
  describe('with Spectator', () => {
    const createComponent = createTestComponentFactory({
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
      const service = spectator.get(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });

    it('should get by abstract class as token', () => {
      const service = spectator.get(AbstractQueryService);
      service.select(); // should compile

      const service2: QueryService = spectator.get(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });

    it('should get by injection token', () => {
      const service = spectator.get(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.get<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });
  });

  describe('with SpectatorWithHost', () => {
    const createHost = createHostComponentFactory({
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
      const service = host.get(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });

    // it('should get by abstract class as token', () => {
    //   const service = host.get(AbstractQueryService);
    //   service.select(); // should compile
    //
    //   const service2 = host.get<QueryService>(AbstractQueryService);
    //   service2.selectName(); // should compile
    //
    //   expect(service instanceof QueryService).toBe(true);
    // });

    it('should get by injection token', () => {
      const service = host.get(MY_TOKEN);
      service.select(); // should compile

      const service2 = host.get<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });
  });

  describe('with Service', () => {
    const spectator = createService({
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

    it('should get by concrete class', () => {
      const service = spectator.get(QueryService);
      service.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });

    it('should get by abstract class as token', () => {
      const service = spectator.get(AbstractQueryService);
      service.select(); // should compile

      const service2 = spectator.get<QueryService>(AbstractQueryService);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });

    it('should get by injection token', () => {
      const service = spectator.get(MY_TOKEN);
      service.select(); // should compile

      const service2 = spectator.get<QueryService>(MY_TOKEN);
      service2.selectName(); // should compile

      expect(service instanceof QueryService).toBe(true);
    });
  });
});
