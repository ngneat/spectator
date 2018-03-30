import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostBinding('style.background-color') backgroundColor: string;

  @HostListener('mouseover')
  onHover() {
    this.backgroundColor = 'rgba(0,0,0, 0.1)';
  }

  @HostListener('mouseout')
  onLeave() {
    this.backgroundColor = '#fff';
  }
}
