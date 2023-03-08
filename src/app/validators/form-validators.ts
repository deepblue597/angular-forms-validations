import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value); //test if the username contains the string admin we set forbidden true
    return forbidden ? { forbiddenName: { value: control.value } } : null; //this name will be used for mat error
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirm');

    return password && confirm && password.value !== confirm.value
      ? { missMatch: true }
      : null; //this name will be used for mat error
  };
}
