import { Component, OnInit } from "@angular/core";
import { WidgetService } from "../widget.service";

@Component({
  selector: "app-widget",
  template: `
    <button (click)="onClick()">Click</button>
  `,
  styles: []
})
export class WidgetComponent implements OnInit {
  constructor(public widgetService: WidgetService) {}

  ngOnInit() {}

  onClick() {
    this.widgetService.get();
  }
}
