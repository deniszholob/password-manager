import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** @ref https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ff650303(v=pandp.10)?redirectedfrom=MSDN#common-regular-expressions */
export function urlValidator(
  control: AbstractControl
): ValidationErrors | null {
  return !control.value ||
    // eslint-disable-next-line no-useless-escape
    /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/.test(
      control.value
    )
    ? null
    : { url: true };
}

export function optionValidator(validItems: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Not handling required validation
    if (!control.value) return null;
    const validationError: ValidationErrors = {
      option: control.value,
    };
    const value: string = control.value ?? '';
    const isValid: boolean = validItems
      .map((v) => v.toLocaleLowerCase())
      .includes(value.toLocaleLowerCase());
    return isValid ? null : validationError;
  };
}
