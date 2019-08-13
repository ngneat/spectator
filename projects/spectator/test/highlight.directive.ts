import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @HostBinding('style.background-color') public backgroundColor?: string;

  @HostListener('mouseover') public onHover(): void {
    this.backgroundColor = 'rgba(0,0,0, 0.1)';
  }

  @HostListener('mouseout') public onLeave(): void {
    this.backgroundColor = '#fff';
  }
}
