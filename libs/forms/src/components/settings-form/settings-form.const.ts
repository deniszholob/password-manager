import { FormlyFieldConfig } from '@ngx-formly/core';
import { getIconSrcOptionsArray, IconSrcOptions } from '@pwm/util';
import { Observable } from 'rxjs';
import { generateFormlyOptions } from '../util';


// dataFile?: string;
// defaultIconSrc?: IconSrcOptions;
// encryption?: EncryptionOptions;
// saveKeys?: SaveKeyOptions;
// keys?: { [filename: string]: string };


export function FORMLY_SETTINGS_CONFIG(): FormlyFieldConfig[] {
  return [
    {
      key: 'dataFile',
    },
    {
      key: 'defaultIconSrc',
      type: 'select',
      templateOptions: {
        label: 'Default Icon Source',
        options: getIconSrcOptionsArray(),
        required: true,
      },
    },
    // {
    //   key: 'encryption',
    //   type: 'select',
    //   templateOptions: {
    //     label: 'Encryption',
    //     options: this.generateFormlyOptions(getEncryptionOptionsArray()),
    //     required: true,
    //   },
    // },
    // {
    //   key: 'saveKeys',
    //   type: 'select',
    //   templateOptions: {
    //     label: 'Save Keys',
    //     options: this.generateFormlyOptions(getSaveKeyOptionsArray()),
    //     required: true,
    //   },
    //   expressionProperties: {
    //     'templateOptions.disabled': (model) =>
    //       !model.encryption || model.encryption === EncryptionOptions.off,
    //     'model.saveKeys': (model) =>
    //       !model.encryption || model.encryption === EncryptionOptions.off
    //         ? null
    //         : model.saveKeys || SaveKeyOptions.all,
    //   },
    // },
  ];
}
