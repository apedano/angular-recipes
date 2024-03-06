import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Observable, catchError, first, map, of, tap } from 'rxjs';
import { UnitNameUniqueValidator } from './unit-name-unique.validator';


@Directive({
  selector: '[unitNameUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UnitNameUniqueValidatorDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class UnitNameUniqueValidatorDirective implements AsyncValidator {

  constructor(private uniqueNameValidator: UnitNameUniqueValidator) { }
  
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.uniqueNameValidator.validate(control);
  }

}


