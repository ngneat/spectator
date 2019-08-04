import { Component, OnInit } from '@angular/core';

export class SomeService {
  text = 'original';
}

@Component({
  selector: 'app-override-provider',
  template: `<h1>{{ service.text }}</h1>`
})
export class OverrideProviderComponent implements OnInit {
  constructor(public service: SomeService) {}

  ngOnInit() {}
}
