import { Directive, forwardRef, Input } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  FormGroup,
  ValidationErrors
} from "@angular/forms";

@Directive({
  selector: "[prEqualValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValidatorDirective),
      multi: true
    }
  ]
})
export class EqualValidatorDirective {
  @Input("prEqualValidator") matchValueFields: string[] = [];

  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors {
    return this.matchValue(this.matchValueFields[0], this.matchValueFields[1])(
      formGroup
    );
  }

  matchValue(firstControlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[firstControlName];
      const secondControl = formGroup.controls[secondControlName];
      // return null if controls haven't initialised yet
      if (
        !firstControl ||
        !secondControl ||
        !firstControl.value ||
        !secondControl.value
      ) {
        return null;
      }
      if (secondControl.errors && !secondControl.errors.matchValueError) {
        return null;
      }
      if (firstControl.value !== secondControl.value) {
        secondControl.setErrors({ matchValueError: true });
      } else {
        secondControl.setErrors(null);
      }
    };
  }
}
