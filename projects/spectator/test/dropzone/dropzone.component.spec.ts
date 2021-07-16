/* eslint-disable */
import { Component } from '@angular/core';
import { DropzoneComponent } from './dropzone.component';
import { DownloadComponent } from '../download/download.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

@Component({
  selector: 'host',
  template: '',
})
class HostComponent {
  allowCSV = false;
  sampleTemplateFilename = '';
  onTemplate = (template: string): void => {};
  onFile = (file: string): void => {};
}

describe('DropzoneComponent', () => {
  let spectator: SpectatorHost<DropzoneComponent, HostComponent>;
  const createHost = createHostFactory({
    component: DropzoneComponent,
    host: HostComponent,
    declarations: [DownloadComponent],
  });

  beforeEach(() => {
    spectator = createHost(`
     <lib-dropzone
        [allowCSV]="allowCSV"
        (template)="onTemplate()"
        (file)="onFile()">
     </lib-dropzone>
  `);
  });

  it('should work', () => {
    const downloadComponent = spectator.queryHost<DownloadComponent>(DownloadComponent);
    const dropzoneComponent = spectator.queryHost<DropzoneComponent>(DropzoneComponent);
    console.log({
      downloadComponent,
      dropzoneComponent,
    });
    spyOn(spectator.hostComponent, 'onTemplate').and.callThrough();
    downloadComponent!.onDownloadClick();
    expect(spectator.hostComponent.onTemplate).toHaveBeenCalled();
  });
});
