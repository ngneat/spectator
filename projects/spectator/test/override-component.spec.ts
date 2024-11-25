import { createComponentFactory, createHostFactory, Spectator, SpectatorHost } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { QueryService } from './query.service';
import { overrideComponents } from '../src/lib/spectator/create-factory';

// Created only for testing purpose
@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standalone">Standalone component with dependency!</div>`,
  standalone: true,
})
export class StandaloneComponentWithDependency {
  constructor(public query: QueryService) {}
}

@Component({
  selector: `app-standalone-with-import`,
  template: `<div id="standalone">Standalone component with import!</div>
    <app-standalone-with-dependency></app-standalone-with-dependency>`,
  imports: [StandaloneComponentWithDependency],
  standalone: true,
})
export class StandaloneWithImportsComponent {}

@Component({
  selector: `app-standalone-with-dependency`,
  template: `<div id="standaloneWithDependency">Standalone component with override dependency!</div>`,
  standalone: true,
})
export class MockStandaloneComponentWithDependency {
  constructor() {}
}

@Component({
  selector: `app-non-standalone`,
  template: `<div id="standalone">Non standalone</div>`,
  standalone: false,
})
export class MockNonStandaloneComponent {
  constructor() {}
}

describe('Override Component', () => {
  it('should throw error when override non standalone component', () => {
    expect(() =>
      overrideComponents({
        overrideComponents: [
          [
            MockNonStandaloneComponent,
            {
              remove: { imports: [] },
              add: { imports: [] },
            },
          ],
        ],
      } as any),
    ).toThrowError('Can not override non standalone component');
  });

  describe('with Spectator', () => {
    let spectator: Spectator<StandaloneWithImportsComponent>;

    const createComponent = createComponentFactory({
      component: StandaloneWithImportsComponent,
      overrideComponents: [
        [
          StandaloneWithImportsComponent,
          {
            remove: { imports: [StandaloneComponentWithDependency] },
            add: { imports: [MockStandaloneComponentWithDependency] },
          },
        ],
      ],
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should render a StandaloneWithImportsComponent', () => {
      expect(spectator.query('#standalone')).toContainText('Standalone component with import!');
    });
  });

  describe('with SpectatorHost', () => {
    let host: SpectatorHost<StandaloneWithImportsComponent>;

    const createHost = createHostFactory({
      component: StandaloneWithImportsComponent,
      template: `<div><app-standalone-with-import></app-standalone-with-import></div>`,
      overrideComponents: [
        [
          StandaloneWithImportsComponent,
          {
            remove: { imports: [StandaloneComponentWithDependency] },
            add: { imports: [MockStandaloneComponentWithDependency] },
          },
        ],
      ],
    });

    beforeEach(() => {
      host = createHost();
    });

    it('should render a StandaloneWithImportsComponent', () => {
      expect(host.query('#standalone')).toContainText('Standalone component with import!');
      expect(host.query('#standaloneWithDependency')).toContainText('Standalone component with override dependency!');
    });
  });
});
