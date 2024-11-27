import { Component } from '@angular/core';

import { ChildServiceService } from '../child-service.service';

@Component({
  selector: 'app-child',
  template: ` <p>child works!</p> `,
  styles: [],
  standalone: false,
})
export class ChildComponent {
  constructor(private readonly service: ChildServiceService) {}
}
