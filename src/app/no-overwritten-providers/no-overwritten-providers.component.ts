import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-component-without-overwritten-providers',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  providers: [
    {
      provide: DummyService,
      useValue: new DummyService()
    }
  ]
})
export class ComponentWithoutOverwrittenProvidersComponent {
  constructor(public dummy: DummyService) {}
}
