import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

interface selectionI {
  id: string;
  name: string;
}

@Component({
  selector: 'pwm-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements AfterViewInit {
  @ViewChild(NgSelectComponent)
  public select: NgSelectComponent;

  @ViewChild('searchInput')
  public searchInput: ElementRef;

  // public form: FormGroup = new FormGroup({});
  /** TODO: Reset to original selections */
  public originalSelections: selectionI[] = [];

  /** Linked model to ng-select */
  public toBeSelected: selectionI[] = [];
  /** Linked form to output */
  public selectionsMade: selectionI[] = [];

  public options: selectionI[] = [
    {
      id: '1',
      name: 'One - mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
    },
    { id: '2', name: 'Two - mmmmmmmm' },
    { id: '3', name: 'Three - mmmmmmmm' },
    { id: '4', name: 'Four - mmmmmmmm' },
    { id: '5', name: 'Five - mmmmmmmm' },
    { id: '6', name: 'Six - mmmmmmmm' },
    { id: '7', name: 'Seven - mmmmmmmm' },
    { id: '8', name: 'Eight - mmmmmmmm' },
    { id: '9', name: 'Nine - mmmmmmmm' },
  ];
  // options = [1, 2, 3, 4];

  // DISPLAY TEXT STUFF
  @ViewChild('.ng-input')
  public selectionTextElement: ElementRef;

  public displayText = '';
  private canvas = document.createElement('canvas');

  ngAfterViewInit() {
    // console.log(this.selectionTextElement);
  }

  public setDisplayText() {
    let text = this.selectionsMade.map((o) => o.name).join('; ');

    // console.log(this.selectionTextElement);
    // const elWidth = this.selectionTextElement.nativeElement.offsetWidth;
    const elWidth = this.select.element.offsetWidth;
    let textWidth = this.getTextWidth(text);

    let n = 0;

    while (textWidth > elWidth) {
      const moreText = n !== 0 ? ` (+ ${n * -1} more)` : '';
      n--;
      const slice = this.selectionsMade.slice(0, n);
      // console.log(`while `, n, slice);

      if (slice.length < 1) {
        const moreTextWidth = n < 0 ? this.getTextWidth(moreText) : 0;

        const cropText = '...';
        const cropTextWidth = this.getTextWidth(cropText);

        const itemText = this.selectionsMade[0].name;
        const itemTextWidth = this.getTextWidth(itemText);

        const availableWidth = elWidth - moreTextWidth - cropTextWidth;

        const displayTextLength = this.textWidthToLength({
          totalLength: itemText.length,
          totalWidth: itemTextWidth,
          desiredWidth: availableWidth,
        });

        // console.log(
        //   `widths`,
        //   this.elWidth, // 400
        //   availableWidth, // 310
        //   moreTextWidth, // 79
        //   cropTextWidth, // 10
        //   itemTextWidth, // 720
        //   itemText,
        // );

        text =
          itemTextWidth < availableWidth
            ? itemText + moreText
            : itemText.slice(0, displayTextLength) + cropText + moreText;

        break;
      } else {
        text = slice.map((o) => o.name).join('; ') + moreText;
      }
      textWidth = this.getTextWidth(text);
    }

    this.displayText = text;
  }

  private textWidthToLength(arg: {
    totalLength: number;
    totalWidth: number;
    desiredWidth: number;
  }): number {
    return (arg.desiredWidth * arg.totalLength) / arg.totalWidth;
  }

  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   *
   * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  private getTextWidth(text: any, font = this.getCanvasFontSize()) {
    const context = this.canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  private getCssStyle(element: Element, prop: string) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
  }

  private getCanvasFontSize(el = document.body) {
    const fontWeight = this.getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = this.getCssStyle(el, 'font-size') || '16px';
    const fontFamily = this.getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

  public setSearchFocus() {
    // console.log(`setSearchFocus()`);
    // This will make the execution after ng-template is rendered
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  public actionCancel() {
    // console.log(`actionCancel()`, this.toBeSelected, this.selectionsMade);
    this.toBeSelected = this.getDeepCopy(this.selectionsMade);
    this.select.close();
  }

  public actionClear() {
    // console.log(`applySelection()`, this.toBeSelected, this.selectionsMade);
    // this.select.handleClearClick();
    this.selectionsMade = [];
    this.toBeSelected = [];
    // console.log(`applySelection()`, this.toBeSelected, this.selectionsMade);
    this.select.close();
  }

  public actionApply() {
    // console.log(`applySelection()`, this.toBeSelected, this.selectionsMade);
    this.selectionsMade = this.getDeepCopy(this.toBeSelected);
    this.select.close();
    this.setDisplayText();
  }

  public updateSelections(event: selectionI[]) {
    // console.log(
    //   `updateSelections()`,
    //   this.toBeSelected,
    //   this.selectionsMade,
    //   event
    // );
    this.toBeSelected = this.getDeepCopy(event);
    // console.log(`updateSelections()`, this.toBeSelected, this.selectionsMade);
  }

  private getDeepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
