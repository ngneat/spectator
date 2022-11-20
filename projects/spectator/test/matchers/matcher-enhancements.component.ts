import { Component } from '@angular/core';

export interface Dummy {
  label: string;
  active: boolean;
}

@Component({
  selector: 'matcher-enhancements',
  template: `
    <div class="text-check">It should have</div>
    <div class="text-check">Some different text</div>
    <div class="text-check">
      And another one
    </div>
    <div class="one-class two-class" id="multi-class"></div>
    <input class="sample" value="test1" />
    <input class="sample" value="test2" />
    <input class="checkbox" type="checkbox" checked />
    <input class="checkbox-indeterminate" type="checkbox" [indeterminate]="true" />
    <div id="attr-check" label="test label"></div>
    <img src="http://localhost:8080/assets/myimg.jpg" />
  `
})
export class MatcherEnhancementsComponent {
  public dummyValue: Dummy = { label: 'this is a dummy value', active: true };
}
