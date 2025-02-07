import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pwm-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {
  @Input()
  public disabled = false;
  @Input()
  public btnName = 'Load File';
  @Input()
  public accept = '';
  @Output()
  public fileChange: EventEmitter<File> = new EventEmitter<File>();
}
