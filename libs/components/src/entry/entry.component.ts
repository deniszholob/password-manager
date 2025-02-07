import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entry } from '@pwm/util';

@Component({
  selector: 'pwm-entry',
  templateUrl: './entry.component.html',
})
export class EntryComponent {
  @Input()
  public entry: Entry | null = null;

  @Output()
  public selected = new EventEmitter<void>();

  public selectedClick(): void {
    this.selected.next();
  }
}
