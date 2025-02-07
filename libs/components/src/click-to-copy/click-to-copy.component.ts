import { Component, Input, OnInit } from '@angular/core';
import { copyMessageNavigator } from '@pwm/util';

export type ToolTipPositions =
  | 'up'
  | 'left'
  | 'right'
  | 'down'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

/**
 * @usage
 *  <pwm-click-to-copy [text]="'text-to-copy'" [name]="'email'">
 *    contents to display
 *  </pwm-click-to-copy>
 */
@Component({
  selector: 'pwm-click-to-copy',
  templateUrl: './click-to-copy.component.html',
  styleUrls: ['./click-to-copy.component.scss'],
})
export class ClickToCopyComponent implements OnInit {
  @Input()
  public text = '';
  @Input()
  public name = 'Content';
  @Input()
  public pos: ToolTipPositions = 'left';

  public tooltipMsg?: string;
  public readonly tooltipCopied = 'Copied';

  ngOnInit(): void {
    this.tooltipMsg = `Copy ${this.name}`;
  }

  public copyToClipboard() {
    // console.log(`copyToClipboard ${this.text}`);
    copyMessageNavigator(this.text);
    this.tooltipMsg = this.tooltipCopied;
    this.resetTooltip();
  }

  /** Resets the tooltip message to the default and close after a timeout */
  private resetTooltip(): void {
    setTimeout(() => {
      this.tooltipMsg = `Copy ${this.name}`;
      // console.log(this.tooltipMsg);
    }, 2000);
  }
}
