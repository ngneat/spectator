import { ViewChildrenComponent } from "./view-children.component";
import { createTestComponentFactory } from "../../lib/src/spectator";
import { Spectator } from "../../lib/src/internals";
import { ChildComponent } from "../child/child.component";
import { ChildServiceService } from "../child-service.service";
import {
  createHostComponentFactory,
  SpectatorWithHost
} from "../../lib/src/host";

describe("ViewChildrenComponent", () => {
  let spectator: Spectator<ViewChildrenComponent>;
  const createComponent = createTestComponentFactory({
    component: ViewChildrenComponent,
    providers: [ChildServiceService],
    declarations: [ChildComponent]
  });

  it("should exist", () => {
    spectator = createComponent();
    expect(spectator.component).toBeDefined();
  });

  it("should expose the view child", () => {
    const serviceFromChild = spectator.query<ChildServiceService>(
      ChildComponent,
      { read: ChildServiceService }
    );
    const div = spectator.query("div");
    const component = spectator.query<ChildComponent>(ChildComponent);
    const button = spectator.query("button");

    expect(serviceFromChild).toBeDefined();
    expect(component).toBeDefined();
    expect(div).toExist();
  });

  it("should expose the view children", () => {
    const serviceFromChild = spectator.queryAll<ChildServiceService>(
      ChildComponent,
      { read: ChildServiceService }
    );
    const divs = spectator.queryAll("div");
    const components = spectator.queryAll<ChildComponent>(ChildComponent);
    expect(serviceFromChild.length).toBe(4);
    expect(components.length).toBe(4);
    expect(divs.length).toBe(2);
  });
});

describe("ContentChild", () => {
  let host: SpectatorWithHost<ViewChildrenComponent>;

  const createHost = createHostComponentFactory({
    component: ViewChildrenComponent,
    providers: [ChildServiceService],
    declarations: [ChildComponent]
  });

  it("should get also the content childs", () => {
    host = createHost(`
       <app-view-children>
         <app-child></app-child>
         <app-child></app-child>
      </app-view-children>
    `);

    const contentChilds = host.queryAll<ChildComponent>(ChildComponent);
    expect(contentChilds.length).toBe(6);
  });
});
