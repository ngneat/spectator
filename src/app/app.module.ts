import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AsyncInputComponent } from './async-input/async-input.component';
import { AsyncComponent } from './async/async.component';
import { AutoFocusDirective } from './auto-focus.directive';
import { ButtonComponent } from './button/button.component';
import { CalcComponent } from './calc/calc.component';
import { ChildServiceService } from './child-service.service';
import { ChildComponent } from './child/child.component';
import { ClickComponent } from './click/click.component';
import { ConsumeDynamicComponent } from './consum-dynamic/consume-dynamic.component';
import { DomSelectorsComponent } from './dom-selectors/dom-selectors.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { FgComponent } from './fg/fg.component';
import { HelloComponent } from './hello/hello.component';
import { HighlightDirective } from './highlight.directive';
import { ComponentWithoutOverwrittenProvidersComponent } from './no-overwritten-providers/no-overwritten-providers.component';
import { AppUnlessDirective } from './unless/unless.component';
import { ViewChildrenComponent } from './view-children/view-children.component';
import { WidgetDataService } from './widget-data.service';
import { WidgetService } from './widget.service';
import { WidgetComponent } from './widget/widget.component';
import { ZippyComponent } from './zippy/zippy.component';

@NgModule({
  declarations: [AppComponent, ZippyComponent, ButtonComponent, HighlightDirective, CalcComponent, DynamicComponent, ConsumeDynamicComponent, ViewChildrenComponent, ChildComponent, WidgetComponent, AppUnlessDirective, WidgetComponent, ClickComponent, AutoFocusDirective, FgComponent, AsyncComponent, DomSelectorsComponent, HelloComponent, AsyncInputComponent, ComponentWithoutOverwrittenProvidersComponent],
  entryComponents: [DynamicComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [ChildServiceService, WidgetService, WidgetDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
