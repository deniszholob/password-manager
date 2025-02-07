import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getIconSrcOptionsArray, SettingsData } from '@pwm/util';

import { generateFormlyOptions } from '../util';
import { FORMLY_SETTINGS_CONFIG } from './settings-form.const';

@Component({
  selector: 'pwm-settings-form',
  templateUrl: './settings-form.component.html',
  // styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent {
  @Output()
  public save = new EventEmitter<SettingsData | null>();
  @Output()
  public cancel = new EventEmitter<void>();

  private _fModel: SettingsData | null = null;
  public fModelInitial: SettingsData | null = null;

  @Input()
  public set fModel(model: SettingsData | null) {
    // console.log(`set fModel() -`, model);
    this._fModel = model;
    if (this.fModelInitial !== model) {
      // console.log('copy');
      this.fModelInitial = JSON.parse(JSON.stringify(model));
    }
  }

  public get fModel(): SettingsData | null {
    return this._fModel;
  }

  public fGroup = new FormGroup({});
  public fFields: FormlyFieldConfig[] = FORMLY_SETTINGS_CONFIG();

  public resetForm() {
    // console.log(`Reset`);
    this.fModel = this.fModelInitial;
    this.cancel.emit();
  }

  public onSubmit({ valid, value }: any) {
    // console.log(`onSubmit()`, valid, value);
    this.save.emit(this.fModel);
  }
}
