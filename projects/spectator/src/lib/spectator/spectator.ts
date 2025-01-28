import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { ComponentFixture, DeferBlockFixture, DeferBlockState } from '@angular/core/testing';

import { DomSpectator } from '../base/dom-spectator';
import { setProps } from '../internals/query';
import { SpyObject } from '../mock';
import { Token } from '../token';
import { DeferBlocks, InferInputSignal, InferInputSignals, NestedDeferBlocks } from '../types';

/**
 * @publicApi
 */
export class Spectator<C> extends DomSpectator<C> {
  constructor(
    public fixture: ComponentFixture<C>,
    public debugElement: DebugElement,
    protected instance: C,
    public element: HTMLElement,
  ) {
    super(fixture, debugElement, instance, element);
  }

  public get component(): C {
    return this.instance;
  }

  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    if (fromComponentInjector) {
      return this.debugElement.injector.get(token) as SpyObject<T>;
    }

    return super.inject(token);
  }

  public detectComponentChanges(): void {
    if (this.debugElement) {
      this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
    } else {
      this.detectChanges();
    }
  }

  public setInput<K extends keyof C>(input: InferInputSignals<C>): void;
  public setInput(input: { [inputName: string]: unknown }): void;
  public setInput<K extends keyof C>(input: K, inputValue: InferInputSignal<C[K]>): void;
  public setInput(input: string, inputValue: unknown): void;
  public setInput(input: any, value?: any): void {
    setProps(this.fixture.componentRef, input, value);
    // Force cd on the host component for cases such as: https://github.com/ngneat/spectator/issues/539
    this.detectChanges();

    // Force cd on the tested component
    this.debugElement.injector.get(ChangeDetectorRef).detectChanges();
  }

  public deferBlock(deferBlockIndex = 0): DeferBlocks {
    return this._deferBlocksForGivenFixture(deferBlockIndex, this.fixture.getDeferBlocks());
  }

  /**
   *
   * @param deferBlockFixtures Defer block fixture
   * @returns deferBlock object with methods to access the defer blocks
   */
  private _deferBlocksForGivenFixture(deferBlockIndex = 0, deferBlockFixtures: Promise<DeferBlockFixture[]>): DeferBlocks {
    return {
      renderComplete: async () => {
        const renderedDeferFixture = await this._renderDeferStateAndGetFixture(
          DeferBlockState.Complete,
          deferBlockIndex,
          deferBlockFixtures,
        );

        return this._childrenDeferFixtures(renderedDeferFixture);
      },
      renderPlaceholder: async () => {
        const renderedDeferFixture = await this._renderDeferStateAndGetFixture(
          DeferBlockState.Placeholder,
          deferBlockIndex,
          deferBlockFixtures,
        );

        return this._childrenDeferFixtures(renderedDeferFixture);
      },
      renderLoading: async () => {
        const renderedDeferFixture = await this._renderDeferStateAndGetFixture(
          DeferBlockState.Loading,
          deferBlockIndex,
          deferBlockFixtures,
        );

        return this._childrenDeferFixtures(renderedDeferFixture);
      },
      renderError: async () => {
        const renderedDeferFixture = await this._renderDeferStateAndGetFixture(DeferBlockState.Error, deferBlockIndex, deferBlockFixtures);

        return this._childrenDeferFixtures(renderedDeferFixture);
      },
    };
  }

  /**
   * Renders the given defer block state and returns the defer block fixture
   *
   * @param deferBlockState complete, placeholder, loading or error
   * @param deferBlockIndex index of the defer block to render
   * @param deferBlockFixtures Defer block fixture
   * @returns Defer block fixture
   */
  private async _renderDeferStateAndGetFixture(
    deferBlockState: DeferBlockState,
    deferBlockIndex = 0,
    deferBlockFixtures: Promise<DeferBlockFixture[]>,
  ): Promise<DeferBlockFixture> {
    const deferFixture = (await deferBlockFixtures)[deferBlockIndex];

    await deferFixture.render(deferBlockState);

    return deferFixture;
  }

  /**
   *
   * @param deferFixture Defer block fixture
   * @returns deferBlock object with methods to access the nested defer blocks
   */
  private _childrenDeferFixtures(deferFixture: DeferBlockFixture): NestedDeferBlocks {
    return {
      deferBlock: (deferBlockIndex = 0) => this._deferBlocksForGivenFixture(deferBlockIndex, deferFixture.getDeferBlocks()),
    };
  }
}
