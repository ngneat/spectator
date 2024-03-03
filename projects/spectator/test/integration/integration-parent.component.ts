import { Component } from '@angular/core';

import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-integration-parent',
  template: ` <app-integration-child></app-integration-child> `,
  styles: [],
})
export class IntegrationParentComponent {
  constructor(public widgetService: WidgetService) {}
}
