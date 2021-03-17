import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { OverlayContainerComponent } from './overlay-container.component';
import { OverlayContentComponent } from './overlay-content.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [OverlayContainerComponent, OverlayContentComponent],
  exports: [OverlayContainerComponent]
})
export class OverlayContainerModule {}
