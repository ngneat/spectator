/* eslint-disable */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-dropzone',
  template: ` <lib-download (selectedFile)="onTemplateSelectedForDownload($event)"></lib-download> `,
})
export class DropzoneComponent {
  @Input() allowCSV;
  @Output() template = new EventEmitter<string>();

  onTemplateSelectedForDownload(file: string) {
    this.template.emit(file);
  }
}
