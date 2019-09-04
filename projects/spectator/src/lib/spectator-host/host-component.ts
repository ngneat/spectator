import { Component, NgModule } from '@angular/core';

@Component({
  template: ''
})
export class HostComponent {
  // little trick to for type inference, so that nothing extends HostComponent.
  protected readonly isHost = (): boolean => {
    return true;
  };
}

/*
  This is an unused module to resolve the ng build error:
    'Cannot determine the module for class HostComponent'

  Reference: https://github.com/angular/issues/13590
*/
@NgModule({
  declarations: [HostComponent]
})
export class HostModule {}
