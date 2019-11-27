import { Component } from '@angular/core';

@Component({
  selector: 'matcher-enhancements',
  template: `
    <div class="text-check">It should have</div>
    <div class="text-check">Some different text</div>
    <div class="one-class two-class" id="multi-class"></div>
    <input class="sample" value="test1" />
    <input class="sample" value="test2" />
    <input class="checkbox" type="checkbox" checked />
    <div id="attr-check" label="test label"></div>
    <img src="http://localhost:8080/assets/myimg.jpg" />
  `
})
export class MatcherEnhancementsComponent {}
