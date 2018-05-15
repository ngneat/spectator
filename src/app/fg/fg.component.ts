import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-fg",
  template: `
    <form [formGroup]="group">
      <input formControlName="name">
    </form>
  `,
  styles: []
})
export class FgComponent implements OnInit {
  @Input() group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
