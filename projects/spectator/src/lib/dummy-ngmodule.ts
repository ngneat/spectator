// We need this in order to stop Angular CLI complaining when it finds module-less components like the host component

import { NgModule } from '@angular/core';
import { HostComponent } from './config';

@NgModule({
  declarations: [HostComponent]
})
export class DummyNgModule {}
