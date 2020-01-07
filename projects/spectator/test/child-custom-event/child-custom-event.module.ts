import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildCustomEventParentComponent } from './child-custom-event-parent.component';
import { ChildCustomEventComponent } from './child-custom-event.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChildCustomEventParentComponent, ChildCustomEventComponent],
  exports: [ChildCustomEventParentComponent]
})
export class ChildCustomEventModule {}
