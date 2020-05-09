import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective]
})
export class AutoFocusModule {}
