import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Entry, IconSrcOptions } from '@pwm/util';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { FORMLY_ENTRY_CONFIG } from './entry-form.const';

@Component({
  selector: 'pwm-entry-form',
  styles: [':host{display:contents}'],
  templateUrl: './entry-form.component.html',
  // styleUrls: ['./entry-form.component.scss'],
})
export class EntryFormComponent implements OnInit, AfterViewInit {
  private _fModel: Entry | null = null;
  @Input()
  public set fModel(model: Entry | null) {
    // console.log(`set fModel() -`, model);
    this._fModel = JSON.parse(JSON.stringify(model));
    if (this.fModelInitial !== model) {
      // console.log('copy');
      this.fModelInitial = JSON.parse(JSON.stringify(model));
    }
  }
  public get fModel(): Entry | null {
    return this._fModel;
  }
  private _defaultIconSrc: IconSrcOptions = IconSrcOptions.default;
  @Input()
  public set defaultIconSrc(iconSrc: IconSrcOptions | undefined) {
    this._defaultIconSrc = iconSrc ?? IconSrcOptions.default;
  }
  public get defaultIconSrc(): IconSrcOptions {
    return this._defaultIconSrc;
  }

  @Input()
  public tagOptions$: Observable<string[]> = of([]);
  @Input()
  public emailOptions$: Observable<string[]> = of([]);

  @Output()
  public cancel = new EventEmitter<void>();
  @Output()
  public delete = new EventEmitter<Entry | null>();
  @Output()
  public save = new EventEmitter<Entry | null>();
  @Output()
  public unsavedChanges = new EventEmitter<boolean>();

  public fModelInitial: Entry | null = null;
  public fGroup = new FormGroup({});
  public fFields: FormlyFieldConfig[] = [];

  ngOnInit(): void {
    this.fFields = FORMLY_ENTRY_CONFIG(
      this.defaultIconSrc,
      this.tagOptions$,
      this.emailOptions$
    );
  }

  ngAfterViewInit(): void {
    // TODO: Unsaved changes feature
    this.fGroup.valueChanges
      .pipe(
        distinctUntilChanged((x, y) => {
          return JSON.stringify(x) === JSON.stringify(y);
        })
      )
      .subscribe((value) => {
        // console.log(`formChanged`, JSON.parse(JSON.stringify(value)));
        const formChanged =
          this.fGroup.dirty && this.fModelInitial !== this.fModel;
        // const hasChange: boolean = Object.keys(this.fModel)
        //   .filter((m) => m !== 'usernameSameAsEmail')
        //   .some((key: string) => {
        //     const result = (this.fModel as any)[key] !== (this.fModelInitial as any)[key];
        //     console.log(result, (this.fModel as any)[key], (this.fModelInitial as any)[key])
        //     return result;
        //   });
        // console.log(
        //   'keys',
        //   Object.keys(this.fModel).filter((m) => m !== 'usernameSameAsEmail'),
        //   Object.keys(this.fModelInitial).filter(
        //     (m) => m !== 'usernameSameAsEmail'
        //   )
        // );
        // console.log(hasChange, this.fModel, this.fModelInitial);
        this.unsavedChanges.emit(formChanged);
      });
  }

  public formCancel(): void {
    // console.log(`formCancel()`);
    this.fModel = this.fModelInitial;
    this.cancel.emit();
  }

  public formDelete(): void {
    // console.log(`formDelete()`);
    this.delete.emit(this.fModelInitial);
  }

  public formSubmit({ valid, value }: any): void {
    // console.log(`formSubmit()`, valid, value);
    if (this.fGroup.valid) {
      // delete (this.fModel as any)['usernameSameAsEmail'];
      // console.log(`formSubmit`, this.fModel);
      this.save.emit(this.fModel);
    } else {
      this.fGroup.markAllAsTouched;
    }
  }
}
