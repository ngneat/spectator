import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickComponent } from './click.component';

declare let Zone: any;
const async = Zone[Zone.__symbol__('asyncTest')];
const { fakeAsync, tick } = Zone[Zone.__symbol__('fakeAsyncTest')];

describe('ClickComponent', () => {
  let component: ClickComponent;
  let fixture: ComponentFixture<ClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClickComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changed on click', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    tick(100);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').textContent).toEqual('changed');
  }));
});
