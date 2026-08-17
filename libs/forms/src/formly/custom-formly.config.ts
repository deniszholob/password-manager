import { ConfigOption } from '@ngx-formly/core';

export const FORMLY_CONFIG: ConfigOption = {
  extras: { lazyRender: true },
  validationMessages: [
    {
      name: 'required',
      message: 'This field is required',
    },
    {
      name: 'email',
      message: 'Email not valid',
    },
    {
      name: 'url',
      message: 'Url not valid, make sure you include "https://"',
    },
    {
      name: 'option',
      message: 'Value not valid, must be one of available options',
    },
  ],
};
