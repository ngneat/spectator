import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-integration-parent',
  template: `
    <app-integration-child></app-integration-child>
  `,
  styles: []
})
export class IntegrationParentComponent implements OnInit {
  constructor(public widgetService: WidgetService) {}

  ngOnInit() {}
}
