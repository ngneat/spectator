import { Component, Injectable, OnInit } from '@angular/core';
import { createComponentFactory } from '@ngneat/spectator';

@Injectable()
class SomeService {
  public getFoo(): string {
    return 'original-foo';
  }
}

@Injectable()
class SomeViewService {
  public getFoo(): string {
    return 'original-view-foo';
  }
}

@Component({
  selector: 'some-component',
  template: ``,
  providers: [SomeService],
  viewProviders: [SomeViewService]
})
export class SomeComponent implements OnInit {
  public foo!: string;
  public viewFoo!: string;

  constructor(private readonly someService: SomeService, private readonly someViewService: SomeViewService) {}

  public ngOnInit(): void {
    this.foo = this.someService.getFoo();
    this.viewFoo = this.someViewService.getFoo();
  }
}

describe('SomeComponent', () => {
  describe('without mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have original foo', () => {
      const spectator = createComponent();

      expect(spectator.component.foo).toBe('original-foo');
    });

    it('should have original viewFoo', () => {
      const spectator = createComponent();

      expect(spectator.component.viewFoo).toBe('original-view-foo');
    });
  });

  describe('with overriding providers', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentProviders: [
        {
          provide: SomeService,
          useValue: {
            getFoo: () => 'overridden'
          }
        }
      ]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have overridden foo', () => {
      const spectator = createComponent();

      expect(spectator.component.foo).toBe('overridden');
    });

    it('should have original viewFoo', () => {
      const spectator = createComponent();

      expect(spectator.component.viewFoo).toBe('original-view-foo');
    });
  });

  describe('with component mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentMocks: [SomeService]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have mocked foo', () => {
      const spectator = createComponent({
        detectChanges: false
      });

      spectator.inject(SomeService, true).getFoo.andReturn('mocked-foo');
      spectator.detectChanges();

      expect(spectator.component.foo).toBe('mocked-foo');
    });

    it('should have original viewFoo', () => {
      const spectator = createComponent();

      expect(spectator.component.viewFoo).toBe('original-view-foo');
    });
  });

  describe('with view overriding', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentViewProviders: [
        {
          provide: SomeViewService,
          useValue: {
            getFoo: () => 'overridden'
          }
        }
      ]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have overridden viewFoo', () => {
      const spectator = createComponent();

      expect(spectator.component.viewFoo).toBe('overridden');
    });

    it('should not have overridden foo', () => {
      const spectator = createComponent();

      expect(spectator.component.foo).toBe('original-foo');
    });
  });

  describe('with component view mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentViewProvidersMocks: [SomeViewService]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have mocked viewFoo', () => {
      const spectator = createComponent({
        detectChanges: false
      });

      spectator.get(SomeViewService, true).getFoo.andReturn('mocked-view-foo');
      spectator.detectChanges();

      expect(spectator.component.viewFoo).toBe('mocked-view-foo');
    });

    it('should not have overridden foo', () => {
      const spectator = createComponent();

      expect(spectator.component.foo).toBe('original-foo');
    });
  });

  describe('with overriding providers and view providers', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentProviders: [
        {
          provide: SomeService,
          useValue: {
            getFoo: () => 'overridden'
          }
        }
      ],
      componentViewProviders: [
        {
          provide: SomeViewService,
          useValue: {
            getFoo: () => 'overridden'
          }
        }
      ]
    });

    it('should have overridden foo', () => {
      const spectator = createComponent();

      expect(spectator.component.foo).toBe('overridden');
    });

    it('should have overridden viewFoo', () => {
      const spectator = createComponent();

      expect(spectator.component.viewFoo).toBe('overridden');
    });
  });

  describe('with component mocking and component view mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      componentMocks: [SomeService],
      componentViewProvidersMocks: [SomeViewService]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should have mocked foo', () => {
      const spectator = createComponent({
        detectChanges: false
      });

      spectator.get(SomeService, true).getFoo.andReturn('mocked-foo');
      spectator.detectChanges();

      expect(spectator.component.foo).toBe('mocked-foo');
    });

    it('should have mocked view foo', () => {
      const spectator = createComponent({
        detectChanges: false
      });

      spectator.get(SomeViewService, true).getFoo.andReturn('mocked-view-foo');
      spectator.detectChanges();

      expect(spectator.component.viewFoo).toBe('mocked-view-foo');
    });
  });

  describe('when global mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      mocks: [SomeService, SomeViewService]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should not use the global service mock', () => {
      const spectator = createComponent();

      expect(spectator.get(SomeService).getFoo).not.toHaveBeenCalled();
    });

    it('should not use the global view service mock', () => {
      const spectator = createComponent();

      expect(spectator.inject(SomeService).getFoo).not.toHaveBeenCalled();
    });
  });
});
