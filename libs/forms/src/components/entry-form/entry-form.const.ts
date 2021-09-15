import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  Entry,
  getIconSrcOptionsArray,
  getIconSrcOptionValuesArray,
  IconSrcOptions,
} from '@pwm/util';
import { Observable } from 'rxjs';

import { optionValidator, urlValidator } from '../../validators';

export function FORMLY_ENTRY_CONFIG(
  defaultIconSrc: IconSrcOptions,
  tagOptions$: Observable<string[]>
): FormlyFieldConfig[] {
  return [
    { key: 'usedTimes' },
    { key: 'guid' },
    {
      wrappers: ['url-wrapper', 'form-field'],
      key: 'iconSrc',
      type: 'select',
      defaultValue: defaultIconSrc,
      templateOptions: {
        label: 'Icon Source',
        options: getIconSrcOptionsArray(),
        attributes: { autocomplete: 'icon-source' },
      },
      validators: {
        validation: [optionValidator(getIconSrcOptionValuesArray())],
      },
    },
    {
      fieldGroupClassName: 'flex flex-row flex-wrap',
      fieldGroup: [
        // {
        //   template: 'BOB',
        // },
        {
          className: 'block flex-auto w-full sm:w-auto',
          key: 'serviceName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Service Name',
            placeholder: 'Service Name',
            required: true,
            attributes: { autocomplete: 'off' },
          },
        },
        {
          className: 'block flex-auto w-full sm:w-auto',
          key: 'serviceUrl',
          type: 'input',
          templateOptions: {
            type: 'url',
            label: 'Service Url',
            placeholder: 'Service Url',
            attributes: { autocomplete: 'off' },
          },
          expressionProperties: {
            'model.serviceUrl': (
              model: Entry,
              formState: any,
              field: FormlyFieldConfig
            ) => {
              // model.serviceUrl = model.serviceUrl?.trim();
              field.form.get('serviceUrl').setValue(model.serviceUrl?.trim());
              return model.serviceUrl?.trim();
            },
          },
          validators: {
            validation: [urlValidator],
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'flex flex-row flex-wrap',
      fieldGroup: [
        // TODO: username same as email
        // {
        //   className: 'block w-full',
        //   key: 'usernameSameAsEmail',
        //   type: 'checkbox',
        //   templateOptions: {
        //     type: 'checkbox',
        //     label: 'Username same as e-mail?',
        //   },
        //   expressionProperties: {
        //     'model.usernameSameAsEmail': (model: any, formState: any, field: FormlyFieldConfig) => {
        //       // console.log(`formState`, formState)
        //       // console.log(`field`, field)
        //       // console.log(`username`, field.form.get('username').pristine)
        //       const same = model.username === model.email;
        //       console.log(same)
        //       return same;
        //         // model.username &&
        //         // model.username.length > 0 &&
        //         // (field.form.get('username'). && model.username !== model.email)
        //         //   ? false
        //         //   : true;

        //       return model.username
        //         ? model.username.length > 0
        //           ? model.username === model.email
        //             ? true
        //             : false
        //           : true
        //         : true;
        //     },
        //   },
        // },
        {
          className: 'block flex-auto w-full sm:w-auto',
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email',
            placeholder: 'Email',
            attributes: { autocomplete: 'email' },
          },
          validators: {
            validation: [Validators.email],
          },
        },
        {
          className: 'block flex-auto w-full sm:w-auto',
          key: 'username',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Username',
            placeholder: 'Username',
            required: true,
            attributes: { autocomplete: 'username' },
          },
          expressionProperties: {
            // 'templateOptions.disabled': 'model.usernameSameAsEmail',
            // 'model.username':
            //   'model.usernameSameAsEmail ? model.email : model.username',
            // 'model.username':'model.username === model.email ? model.email : model.username'
          },
        },
      ],
    },
    {
      wrappers: ['form-field', 'password-wrapper'],
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
        attributes: { autocomplete: 'off' },
      },
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'Notes',
        placeholder: 'Notes',
        rows: 3,
        attributes: { autocomplete: 'off' },
      },
    },
    {
      key: 'recovery',
      type: 'recovery-questions',
      fieldArray: {
        fieldGroup: [
          {
            className: 'block flex-auto w-full sm:w-auto',
            key: 'question',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Question',
              placeholder: 'Question',
              required: true,
              attributes: { autocomplete: 'recovery-question' },
            },
          },
          {
            className: 'block flex-auto w-full sm:w-auto',
            key: 'answer',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Answer',
              placeholder: 'Answer',
              required: true,
              attributes: { autocomplete: 'recovery-answer' },
            },
          },
        ],
      },
    },
    {
      key: 'tags',
      type: 'open-multi-select',
      templateOptions: {
        label: 'Filter Tags',
        placeholder: 'Add Tags',
        options: tagOptions$,
        attributes: { autocomplete: 'tags' },
      },
    },
  ];
}
