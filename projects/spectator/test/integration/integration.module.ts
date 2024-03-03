import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetService } from '../widget.service';
import { WidgetDataService } from '../widget-data.service';

import { IntegrationParentComponent } from './integration-parent.component';
import { IntegrationChildComponent } from './integration-child.component';

@NgModule({
  imports: [CommonModule],
  providers: [WidgetService, WidgetDataService],
  declarations: [IntegrationParentComponent, IntegrationChildComponent],
  exports: [IntegrationParentComponent],
})
export class IntegrationModule {}
