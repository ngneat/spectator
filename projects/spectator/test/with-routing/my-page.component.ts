import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-page',
  template: `
    <div class="title">{{ title }}</div>
    <div class="dynamic-title">{{ dynamicTitle }}</div>
    <div class="foo">{{ foo }}</div>
    <div class="bar">{{ bar }}</div>
    <div class="baz">{{ baz$ | async }}</div>
    <a class="link-1" [routerLink]="['/foo']">Some link</a>
    <a class="link-2" (click)="navigate()">Other link</a>
  `
})
export class MyPageComponent implements OnInit {
  public title?: string;
  public dynamicTitle?: string;
  public foo?: string;
  public bar?: string;
  public baz$!: Observable<string>;
  public fragment!: string | null;
  public url?: UrlSegment[];
  public root!: ActivatedRoute | null;
  public parent!: ActivatedRoute | null;
  public children?: ActivatedRoute[];
  public firstChild!: ActivatedRoute | null;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
    this.route.data.subscribe(data => (this.dynamicTitle = data.dynamicTitle));

    this.route.params.subscribe(params => (this.foo = params.foo));
    this.route.paramMap.subscribe(params => (this.bar = params.get('bar')!));
    this.baz$ = this.route.queryParams.pipe(map(params => params.baz));
    this.route.fragment.subscribe(fragment => (this.fragment = fragment));
    this.route.url.subscribe(url => (this.url = url));
    this.root = this.route.root;
    this.parent = this.route.parent;
    this.children = this.route.children;
    this.firstChild = this.route.firstChild;
  }

  public navigate(): void {
    this.router.navigate(['bar']);
  }
}
