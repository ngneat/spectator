import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { BaseSpectator } from '../base/base-spectator';
import { setHostProps } from '../internals/query';
import { HostComponent } from '../spectator-host/host-component';

/**
 * @publicApi
 */
export class SpectatorPipe<P, H = HostComponent> extends BaseSpectator {
  constructor(
    public hostComponent: H,
    public fixture: ComponentFixture<any>,
    public debugElement: DebugElement,
    public element: Element,
  ) {
    super();
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  public setHostInput<K extends keyof H>(input: H extends HostComponent ? any : Partial<H>): void;
  public setHostInput<K extends keyof H>(input: H extends HostComponent ? any : K, inputValue: H extends HostComponent ? any : H[K]): void;
  public setHostInput(input: any, value?: any): void {
    setHostProps(this.fixture.componentRef, input, value);
    this.detectChanges();
  }
}
