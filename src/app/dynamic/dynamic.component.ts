import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dynamic",
  template: `
    <p class="dynamic">
      dynamic works!
    </p>
  `,
  styles: []
})
export class DynamicComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
