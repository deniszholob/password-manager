import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDisplay } from '@pwm/util';

/** @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value */
enum MouseButtons {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

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
  public disabled: boolean = false;

  @Input()
  public files: FileDisplay[] = [];

  @Input()
  public selectedFile?: FileDisplay;

  @Output()
  public selectedFileChange = new EventEmitter<FileDisplay | undefined>();
  @Output()
  public removeFileChange = new EventEmitter<FileDisplay>();
  @Output()
  public showFileChange = new EventEmitter<FileDisplay>();

  /** change tab with left click, remove tab with middle click */
  public onTabClick(file: FileDisplay, event: MouseEvent): void {
    // console.log('onTabClick', file, event, event.button);
    if (this.disabled) return;
    if (event.button === MouseButtons.MIDDLE) {
      return this.onRemoveFile(file, event);
    }

    if (
      event.button === MouseButtons.LEFT &&
      file.path !== this.selectedFile?.path
    ) {
      return this.onSelectFile(file, event);
    }
  }

  public onCreateFile(): void {
    if (this.disabled) return;
    this.selectedFile = undefined;
    this.selectedFileChange.emit(this.selectedFile);
  }

  public onSelectFile(file: FileDisplay, event: Event): void {
    event.stopPropagation();
    if (this.disabled) return;
    this.selectedFile = file;
    // console.log('selectedFile', this.selectedFile);
    this.selectedFileChange.emit(this.selectedFile);
  }

  public onRemoveFile(file: FileDisplay, event: Event): void {
    event.stopPropagation();
    if (this.disabled) return;
    this.removeFileChange.emit(file);
  }

  public onShowFileInExplorer(file: FileDisplay, event: Event): void {
    event.stopPropagation();
    this.showFileChange.emit(file);
  }
}
