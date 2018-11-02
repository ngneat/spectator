import { Component, OnInit } from '@angular/core';
import { ChildServiceService } from '../child-service.service';

@Component({
  selector: 'app-child',
  template: `
    <p>
      child works!
    </p>
  `,
  styles: []
})
export class ChildComponent implements OnInit {
  constructor(private service: ChildServiceService) {}

  ngOnInit() {}
}
