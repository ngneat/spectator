import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integration-child',
  template: `
    <p>
      integration-child works!
    </p>
  `,
  styles: []
})
export class IntegrationChildComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
