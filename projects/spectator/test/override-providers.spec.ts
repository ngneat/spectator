import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Component, InjectionToken } from '@angular/core';

@Component({
  selector: 'lib-test',
  template: '<div>test</div>'
})
class TestComponent {}

class StateMock {}

class AnotherStateMock {}

export const STATE = new InjectionToken<any>('Angular State');

describe('Override providers', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    providers: [{ provide: STATE, useClass: AnotherStateMock }]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should get the correct instance of STATE', () => {
    const service = spectator.inject(STATE);

    expect(service instanceof AnotherStateMock).toBeTrue();
  });

  it('should get the mocked instance of STATE injection token', () => {
    spectator = createComponent({ providers: [{ provide: STATE, useClass: StateMock }] });

    const service = spectator.inject(STATE);

    expect(service instanceof StateMock).toBeTrue();
  });
});
