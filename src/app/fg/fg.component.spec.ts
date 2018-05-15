import { SpectatorWithHost, createHostComponentFactory } from "../../lib/src";
import { Component } from "@angular/core";
import { FgComponent } from "./fg.component";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({ selector: "app-custom-host", template: "" })
class CustomHostComponent {
  group = new FormGroup({
    name: new FormControl("name")
  });
}

describe("With Custom Host Component", function() {
  let host: SpectatorWithHost<FgComponent, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: FgComponent,
    imports: [ReactiveFormsModule],
    host: CustomHostComponent
  });

  it("should display the host component title", () => {
    host = createHost(`<app-fg [group]="group"></app-fg>`);
    expect(host.component).toBeDefined();
  });
});
