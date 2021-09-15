import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pwm-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent {
  @Input()
  public disabled = false;
  @Input()
  public btnName = "Load File";
  @Input()
  public accept = "";
  @Output()
  public fileChange: EventEmitter<File> = new EventEmitter<File>();
  public f: File;

  constructor() {
    //
  }

  /** @see https://stackoverflow.com/questions/58351711/angular-open-file-dialog-upon-button-click */
  public doFileInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const fileList: FileList = event.target.files;
      this.f = fileList.item(0);
      this.fileChange.emit(this.f);
      return
    }
    throw new Error(`Invalid ${typeof event} event, should be HTMLInputElement`)
  }

}
