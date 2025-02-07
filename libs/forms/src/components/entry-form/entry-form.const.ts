import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  Entry,
  getIconSrcOptionsArray,
  getIconSrcOptionValuesArray,
  IconSrcOptions,
  toTitleCase,
} from '@pwm/util';
import { Observable } from 'rxjs';

import { optionValidator, urlValidator } from '../../validators';

function parserToLowerCase(str: string): string {
  return str.toLowerCase();
}
function parserToTitleCase(str: string): string {
  return toTitleCase(str);
}
function parserTrim(str: string): string {
  return str.trim();
}

export function FORMLY_ENTRY_CONFIG(
  defaultIconSrc: IconSrcOptions,
  tagOptions$: Observable<string[]>,
  emailOptions$: Observable<string[]>
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
        hideCopyButton: true,
      },
      validators: {
        validation: [optionValidator(getIconSrcOptionValuesArray())],
      },
    },
    {
      fieldGroupClassName: 'flex flex-row flex-wrap gap-y-4',
      fieldGroup: [
        // {
        //   template: 'BOB',
        // },
        {
          className: 'block flex-auto w-full sm:w-auto flex-1/2',
          key: 'serviceName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Service Name',
            placeholder: 'Example',
            required: true,
            attributes: { autocomplete: 'off' },
          },
        },
        {
          className: 'block flex-auto w-full sm:w-auto flex-1/2',
          key: 'serviceUrl',
          type: 'input',
          templateOptions: {
            type: 'url',
            label: 'Service Url',
            placeholder: 'https://www.example.com',
            attributes: { autocomplete: 'off' },
          },
          parsers: [parserToLowerCase, parserTrim],
          // expressionProperties: {
          //   'model.serviceUrl': (
          //     model: Entry,
          //     formState: any,
          //     field?: FormlyFieldConfig
          //   ):string => {
          //     // model.serviceUrl = model.serviceUrl?.trim();
          //     field?.form?.get('serviceUrl')?.setValue(model.serviceUrl?.trim());
          //     return model.serviceUrl?.trim()??'';
          //   },
          // },
          validators: {
            validation: [urlValidator],
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'flex flex-row flex-wrap gap-y-4',
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
          className: 'block flex-auto w-full sm:w-auto flex-1/2',
          key: 'email',
          type: 'open-multi-select',
          templateOptions: {
            type: 'email',
            label: 'Email',
            placeholder: 'username@example.com',
            attributes: { autocomplete: 'email' },
            options: emailOptions$,
            addTag: parserToLowerCase,
            multiple: false,
          },
          validators: {
            validation: [Validators.email],
          },
        },
        {
          className: 'block flex-auto w-full sm:w-auto flex-1/2',
          key: 'username',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Username',
            placeholder: 'username',
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
        placeholder: 'StrongPassphraseThatNo1WillGuess!',
        required: true,
        attributes: { autocomplete: 'off' },
      },
    },
    {
      key: 'notes',
      type: 'textarea',
      templateOptions: {
        label: 'Notes',
        placeholder: 'Very important things noted here.',
        rows: 3,
        attributes: { autocomplete: 'off' },
      },
    },
    {
      key: 'tags',
      type: 'open-multi-select',
      templateOptions: {
        label: 'Filter Tags',
        placeholder: 'Add Tags',
        attributes: { autocomplete: 'tags' },
        options: tagOptions$,
        multiple: true,
        addTag: parserToTitleCase,
      },
    },
    {
      key: 'recovery',
      type: 'recovery-questions',
      fieldArray: {
        fieldGroup: [
          {
            className: 'block flex-auto w-full sm:w-auto flex-1/2',
            key: 'question',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Question',
              placeholder: 'What ... is your favorite color?',
              required: true,
              attributes: { autocomplete: 'recovery-question' },
            },
          },
          {
            className: 'block flex-auto w-full sm:w-auto flex-1/2',
            wrappers: ['form-field', 'password-wrapper'],
            key: 'answer',
            type: 'input',
            templateOptions: {
              type: 'password',
              label: 'Answer',
              placeholder: 'Blue!',
              required: true,
              attributes: { autocomplete: 'recovery-answer' },
            },
          },
        ],
      },
    },
  ];
}
