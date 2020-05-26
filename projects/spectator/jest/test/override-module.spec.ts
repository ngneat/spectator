import { Component, Directive, HostBinding, NgModule } from '@angular/core';
import { Spectator, SpectatorDirective, SpectatorHost } from '@ngneat/spectator';
import { createComponentFactory, createDirectiveFactory, createHostFactory } from '@ngneat/spectator/jest';

import { AveragePipe } from '../../test/pipe/average.pipe';

@Component({ selector: 'test-comp', template: '<div someDirective>{{ prop | avg }}</div>' })
class TestComponent {
  public prop = [1, 2, 3];
}

@Directive({ selector: '[someDirective]' })
class SomeDirective {
  @HostBinding('class') public someClass = 'someClass';
}

@NgModule()
class SomeModule {}

describe('Override Module With Component Factory', () => {
  let spectator: Spectator<TestComponent>;
  const createComponent = createComponentFactory({
    component: TestComponent,
    imports: [SomeModule],
    overrideModules: [[SomeModule, { set: { declarations: [AveragePipe], exports: [AveragePipe] } }]]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should be declared with override modules', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('div')?.textContent).toEqual('2');
  });
});

describe('Override Module With Directive Factory', () => {
  let spectator: SpectatorDirective<SomeDirective, TestComponent>;
  const createDirective = createDirectiveFactory({
    directive: SomeDirective,
    host: TestComponent,
    imports: [SomeModule],
    overrideModules: [[SomeModule, { set: { declarations: [AveragePipe], exports: [AveragePipe] } }]]
  });

  beforeEach(() => {
    spectator = createDirective(`<div someDirective>{{ prop | avg }}</div>`);
  });

  it('should be declared with override modules', () => {
    expect(spectator.query('div')?.classList).toContain('someClass');
    expect(spectator.query('div')?.textContent).toEqual('2');
  });
});

describe('Override Module With Host Factory', () => {
  let spectator: SpectatorHost<TestComponent>;
  const createHost = createHostFactory({
    component: TestComponent,
    imports: [SomeModule],
    overrideModules: [[SomeModule, { set: { declarations: [AveragePipe], exports: [AveragePipe] } }]]
  });

  beforeEach(() => {
    spectator = createHost(`<test-comp></test-comp>`);
  });

  it('should be declared with override modules', () => {
    expect(spectator.query('div')?.textContent).toEqual('2');
  });
});
