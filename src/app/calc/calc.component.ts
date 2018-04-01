import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calc",
  template: `
    <input type="text" #a class="a">
    <input type="text" #b class="b">
    <p class="result">{{a.value + b.value}}</p>
  `
})
export class CalcComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
