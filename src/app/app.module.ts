import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ZippyComponent } from "./zippy/zippy.component";
import { ButtonComponent } from "./button/button.component";
import { HttpClientModule } from "@angular/common/http";
import { HighlightDirective } from "./highlight.directive";
import { CalcComponent } from "./calc/calc.component";
import { DynamicComponent } from "./dynamic/dynamic.component";
import { ConsumeDynamicComponent } from "./consum-dynamic/consume-dynamic.component";
import { ViewChildrenComponent } from "./view-children/view-children.component";
import { ChildComponent } from "./child/child.component";
import { ChildServiceService } from "./child-service.service";

@NgModule({
  declarations: [
    AppComponent,
    ZippyComponent,
    ButtonComponent,
    HighlightDirective,
    CalcComponent,
    DynamicComponent,
    ConsumeDynamicComponent,
    ViewChildrenComponent,
    ChildComponent
  ],
  entryComponents: [DynamicComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ChildServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
