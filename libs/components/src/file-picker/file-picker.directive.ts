import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FILE_ACCEPT_DATA } from '@pwm/util';

@Directive({ selector: '[pwmFilePicker]' })
export class FilePickerDirective {
  @Input()
  public accept = FILE_ACCEPT_DATA; // Accepted csv file types (e.g., 'image/*, .pdf')
  @Output()
  public fileChange = new EventEmitter<File>();

  private fileInput: HTMLInputElement;

  constructor(private renderer: Renderer2, el: ElementRef) {
    // Create an invisible file input
    this.fileInput = this.renderer.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.hidden = true;
    this.fileInput.accept = this.accept;
    this.renderer.appendChild(el.nativeElement, this.fileInput);

    // Listen for file selection
    this.fileInput.addEventListener('change', this.onFileInput.bind(this));
  }

  /** @see https://stackoverflow.com/questions/58351711/angular-open-file-dialog-upon-button-click */
  private onFileInput(event: Event): void {
    const input: EventTarget | null = event.target;
    if (!input || !(input instanceof HTMLInputElement)) {
      throw new Error(
        `Invalid ${typeof input} event target, should be HTMLInputElement`
      );
    }

    if (input.files && input.files?.length) {
      this.fileChange.emit(input.files.item(0) ?? undefined);
      input.value = ''; // Reset input to allow re-selection of the same file
    }
  }

  @HostListener('click')
  protected onClick(): void {
    this.fileInput.accept = this.accept; // Apply accepted file types in case they change
    this.fileInput.click();
  }
}
