import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { setProps } from '../internals/query';
import { BaseSpectator } from '../base/base-spectator';
import { HostComponent } from '../spectator-host/host-component';

/**
 * @publicApi
 */
export class SpectatorPipe<P, H = HostComponent> extends BaseSpectator {
  constructor(public hostComponent: H, public fixture: ComponentFixture<any>, public debugElement: DebugElement, public element: Element) {
    super();
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  public setHostInput<K extends keyof H>(input: Partial<H>): void;
  public setHostInput<K extends keyof H>(input: K, inputValue: H[K]): void;
  public setHostInput(input: any, value?: any): void {
    setProps(this.hostComponent, input, value);
    this.detectChanges();
  }
}
