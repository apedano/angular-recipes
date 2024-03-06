import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { AppStateService } from '../app-state.service';

@Directive({
  selector: '[baseUnitFormValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BaseUnitFormValidatorDirective,
      multi: true,
    },
  ],
  standalone: true
})
export class BaseUnitFormValidatorDirective implements Validator {

  constructor(private appStateService: AppStateService) { }


  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.baseUnitFormValidatorFunction(control);
  }

  //this is the method to implement the Validator interface
  private baseUnitFormValidatorFunction: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
       
      const unitIsBase = control.get('unitIsBase')
      const baseUnit = control.get('baseUnit');
      const conversion = control.get('conversion');

      if(unitIsBase?.value == false) {
        this.appStateService.logIfDebug("BaseUnitFormValidatorDirective: it is not unitBase");
        return baseUnit && conversion && baseUnit.value && conversion.value ?
        null  : { baseUnitInvalid: true } ;
      } 
      return null;
    };

}


