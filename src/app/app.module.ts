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
import { WidgetComponent } from "./widget/widget.component";
import { WidgetService } from "./widget.service";
import { WidgetDataService } from "./widget-data.service";
import { AppUnlessDirective } from "./unless/unless.component";
import { ClickComponent } from "./click/click.component";
import { AutoFocusDirective } from "./auto-focus.directive";
import { FgComponent } from "./fg/fg.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AsyncComponent } from "./async/async.component";

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
    ChildComponent,
    WidgetComponent,
    AppUnlessDirective,
    WidgetComponent,
    ClickComponent,
    AutoFocusDirective,
    FgComponent,
    AsyncComponent
  ],
  entryComponents: [DynamicComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [ChildServiceService, WidgetService, WidgetDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
