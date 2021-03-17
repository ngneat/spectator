import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Spectator, createComponentFactory, SpectatorHost } from '@ngneat/spectator';

import { byText } from '@ngneat/spectator';
import { OverlayContainerComponent } from './overlay-container.component';
import { OverlayContainerModule } from './overlay-container.module';
import { OverlayContentComponent } from './overlay-content.component';

describe('Overlay container custom event', () => {
  let spectator: Spectator<object>;

  const createComponent = createComponentFactory({
    component: Component({
      selector: 'test-host',
      template: '<div></div>'
    })(class {}),
    imports: [OverlayContainerModule]
  });

  it('should trigger custom event on a component inside an overlay', () => {
    spectator = createComponent();
    const overlayRef = spectator.inject(Overlay).create();
    const componentPortal = new ComponentPortal<unknown>(OverlayContainerComponent);
    overlayRef.attach(componentPortal);

    spectator.triggerEventHandler(OverlayContentComponent, 'customEvent', 'hello');
    expect(spectator.query(byText('hello'), { root: true })).not.toExist();

    spectator.triggerEventHandler(OverlayContentComponent, 'customEvent', 'hello', { root: true });
    expect(spectator.query(byText('hello'), { root: true })).toExist();

    overlayRef.dispose();
  });
});
