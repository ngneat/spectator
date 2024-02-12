import { Component, Injectable, InjectionToken, OnInit, inject, makeEnvironmentProviders } from '@angular/core';
import { createComponentFactory } from '@ngneat/spectator';

@Injectable()
class SomeService {
  public getFoo(): string {
    return 'original-foo';
  }
}

const provideSomeService = () => makeEnvironmentProviders([SomeService]);

const MOCKED_FOO = new InjectionToken<string>('MOCKED_FOO');

@Injectable()
class SomeMockService {
  mockedFoo = inject(MOCKED_FOO);

  public getFoo(): string {
    return this.mockedFoo;
  }
}

const provideSomeServiceTesting = (customFooValue?: string) =>
  makeEnvironmentProviders([
    { provide: MOCKED_FOO, useValue: customFooValue ?? 'mocked-foo' },
    { provide: SomeMockService, useClass: SomeMockService },
    { provide: SomeService, useExisting: SomeMockService },
  ]);

@Component({
  selector: 'some-component',
  template: ``,
})
export class SomeComponent implements OnInit {
  public foo!: string;

  private readonly someService = inject(SomeService);

  public ngOnInit(): void {
    this.foo = this.someService.getFoo();
  }
}

describe('SomeComponent', () => {
  describe('without mocking', () => {
    const createComponent = createComponentFactory({ component: SomeComponent, providers: [provideSomeService()] });

    it('should have original foo', () => {
      const spectator = createComponent();
      expect(spectator.component.foo).toBe('original-foo');
    });
  });

  describe('with overriding factory providers', () => {
    const createComponent = createComponentFactory({ component: SomeComponent, providers: [provideSomeServiceTesting()] });

    it('should have mocked foo', () => {
      const spectator = createComponent();
      expect(spectator.component.foo).toBe('mocked-foo');
    });
  });

  describe('with overriding createComponent providers', () => {
    const createComponent = createComponentFactory({ component: SomeComponent, providers: [provideSomeService()] });

    it('should have mocked foo', () => {
      const spectator = createComponent({ providers: [provideSomeServiceTesting()] });
      expect(spectator.component.foo).toBe('mocked-foo');
    });
  });

  describe('with overriding factory & createComponent providers', () => {
    const createComponent = createComponentFactory({ component: SomeComponent, providers: [provideSomeServiceTesting()] });

    it('should have mocked foo', () => {
      const spectator = createComponent({ providers: [provideSomeServiceTesting('other-mocked-foo')] });
      expect(spectator.component.foo).toBe('other-mocked-foo');
    });
  });
});
