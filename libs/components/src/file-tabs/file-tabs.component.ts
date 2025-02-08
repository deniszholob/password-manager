import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDisplay } from '@pwm/util';

@Component({
  selector: 'pwm-file-tabs',
  templateUrl: './file-tabs.component.html',
  styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class FileTabsComponent {
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
  // constructor() {}

  @Input()
  public files: FileDisplay[] = [];

  @Input()
  public selectedFile?: FileDisplay;

  @Output()
  public selectedFileChange = new EventEmitter<FileDisplay>();
  @Output()
  public removeFileChange = new EventEmitter<FileDisplay>();
  @Output()
  public showFileChange = new EventEmitter<FileDisplay>();

  public onCreateFile(): void {
    this.selectedFile = undefined;
    this.selectedFileChange.emit(this.selectedFile);
  }

  public onSelectFile(file: FileDisplay): void {
    this.selectedFile = file;
    this.selectedFileChange.emit(this.selectedFile);
  }

  public onRemoveFile(file: FileDisplay, i: number): void {
    this.removeFileChange.emit(file);
  }

  public onShowFileInExplorer(file: FileDisplay): void {
    this.showFileChange.emit(file);
  }
}
