import { Component, Injectable, OnInit } from '@angular/core';
import { createComponentFactory } from '@ngneat/spectator';

@Injectable()
class SomeService {
  public getFoo(): string {
    return 'original-foo';
  }
}

@Component({
  selector: 'some-component',
  template: ``,
  providers: [SomeService]
})
export class SomeComponent implements OnInit {
  public foo!: string;

  constructor(private readonly someService: SomeService) {}

  public ngOnInit(): void {
    this.foo = this.someService.getFoo();
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
  });

  describe('with overriding', () => {
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

      spectator.get(SomeService, true).getFoo.andReturn('mocked-foo');
      spectator.detectChanges();

      expect(spectator.component.foo).toBe('mocked-foo');
    });
  });

  describe('when global mocking', () => {
    const createComponent = createComponentFactory({
      component: SomeComponent,
      mocks: [SomeService]
    });

    it('should create', () => {
      const spectator = createComponent();

      expect(spectator.component).toBeTruthy();
    });

    it('should not use the global mock', () => {
      const spectator = createComponent();

      expect(spectator.get(SomeService).getFoo).not.toHaveBeenCalled();
    });
  });
});
