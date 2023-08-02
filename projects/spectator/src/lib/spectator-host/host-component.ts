import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'lib-ngneat-host-component',
  template: '',
})
export class HostComponent {}

/*
  This is an unused module to resolve the ng build error:
    'Cannot determine the module for class HostComponent'

  Reference: https://github.com/angular/issues/13590
*/
@NgModule({
  declarations: [HostComponent],
})
export class HostModule {}
