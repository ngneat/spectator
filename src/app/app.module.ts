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

@NgModule({
  declarations: [
    AppComponent,
    ZippyComponent,
    ButtonComponent,
    HighlightDirective,
    CalcComponent,
    DynamicComponent,
    ConsumeDynamicComponent
  ],
  entryComponents: [DynamicComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
