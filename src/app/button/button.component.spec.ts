import { ButtonComponent } from "./button.component";
import { createTestComponentFactory } from "../../lib/src/spectator";
import { Spectator } from "../../lib/src/internals";
import { QueryService } from "../query.service";

describe("ButtonComponent", () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createTestComponentFactory({
    component: ButtonComponent,
    componentProviders: [{ provide: QueryService, useValue: "Netanel" }],
    mocks: [QueryService]
  });

  it('should set the "success" class by default', () => {
    spectator = createComponent();
    expect(spectator.query("button")).toHaveClass("success");
  });

  it("should set the class name according to the [className]", () => {
    spectator = createComponent();
    spectator.setInput("className", "danger");
    expect(spectator.query("button")).toHaveClass("danger");
    expect(spectator.query("button")).not.toHaveClass("success");
  });

  it("should set the title according to the [title]", () => {
    spectator = createComponent({ title: "Click" });

    expect(spectator.query("button")).toHaveText("Click");
  });

  it("should emit the $event on click", () => {
    spectator = createComponent();
    let output;
    spectator
      .output<{ type: string }>("click")
      .subscribe(result => (output = result));

    spectator.component.onClick({ type: "click" });
    expect(output).toEqual({ type: "click" });
  });
});
