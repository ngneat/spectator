import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test-focus',
  template: `<button id="button1" (focus)="countFocus('button1')" (blur)="countBlur('button1')">Button1</button>
    <button id="button2" (focus)="countFocus('button2')" (blur)="countBlur('button2')">Button2</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.tabindex]': '0',
    '(focus)': 'countFocus("app-test-focus")',
    '(blur)': 'countBlur("app-test-focus")',
  },
})
export class TestFocusComponent {
  private readonly focusCounts = new Map<string, number>();
  private readonly blurCounts = new Map<string, number>();

  public countFocus(id: string) {
    this.focusCounts.set(id, this.focusCount(id) + 1);
  }

  public countBlur(id: string) {
    this.blurCounts.set(id, this.blurCount(id) + 1);
  }

  public focusCount(id: string): number {
    return this.focusCounts.get(id) ?? 0;
  }

  public blurCount(id: string): number {
    return this.blurCounts.get(id) ?? 0;
  }
}
