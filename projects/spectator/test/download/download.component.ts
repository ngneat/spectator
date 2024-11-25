/* eslint-disable */
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-download',
  template: `
    <h1 (click)="onDownloadClick()">Download comp</h1>
    >
  `,
  standalone: false,
})
export class DownloadComponent {
  @Output() selectedFile = new EventEmitter();

  onDownloadClick() {
    this.selectedFile.emit('someValue');
  }
}
