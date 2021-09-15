import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { copyMessageNavigator, Entry } from '@pwm/util';

const tooltip_Default = 'Copy';
const tooltip_Copied = 'Copied';

@Component({
  selector: 'pwm-entry',
  templateUrl: './entry.component.html',
  // styleUrls: ['./entry.component.scss'],
})
export class EntryComponent {
  @Input()
  public entry: Entry | null = null;

  @Output()
  public selected = new EventEmitter<void>();

  public tooltipMsg = tooltip_Default;
  public clickedCopy = false;

  /**
   * Copies Blueprint to clipboard
   * @param s string to copy
   * @param tooltip NgbTooltip object to operate on
   */
  public copyToClipboard(s: string, tooltip?: NgbTooltip) {
    // console.log(`to copy ${s}`);
    copyMessageNavigator(s);
    this.clickedCopy = true;
    this.tooltipMsg = tooltip_Copied;
    this.resetTooltip(tooltip);
  }

  public getTooltip(name: string): string {
    return this.tooltipMsg === tooltip_Copied
      ? this.tooltipMsg
      : `Copy ${name}`;
  }

  /**
   * Resets the tooltip message to the default and close after a timeout
   * @param tooltip NgbTooltip object to operate on
   */
  private resetTooltip(tooltip?: NgbTooltip): void {
    setTimeout(() => {
      if (tooltip) tooltip.close();
      this.clickedCopy = false;
      this.tooltipMsg = tooltip_Default;
      // console.log(this.tooltipMsg);
    }, 2000);
  }

  public isEmailPresent(): boolean {
    if (!this.entry) return false;
    return this.entry.email && this.entry.email.length > 0;
  }

  public isUsernamePresent(): boolean {
    if (!this.entry) return false;
    return this.entry.username && this.entry.username.length > 0;
  }

  public isPasswordPresent(): boolean {
    if (!this.entry) return false;
    return this.entry.password && this.entry.password.length > 0;
  }

  public selectedClick() {
    this.selected.next();
  }
}
