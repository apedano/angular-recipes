import { Directive, Input, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { NameUniqueValidator } from './name-unique.validator';
import { NameEntity } from '../model/name-entiry.model';
import { GenericNameBasedService } from '../generic.name.based.service';
import { AppStateService } from '../app-state.service';


@Directive({
  selector: '[nameUnique]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NameUniqueValidatorDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class NameUniqueValidatorDirective<T extends NameEntity> implements AsyncValidator, OnInit {

  @Input()
  nameUnique!: GenericNameBasedService<T>;

  @Input()
  validateUppercase!: boolean;

  private uniqueNameValidator!: NameUniqueValidator<T>;

  constructor(private appStateService: AppStateService) { }
  
  ngOnInit(): void {
    this.uniqueNameValidator = new NameUniqueValidator(this.appStateService, this.nameUnique, this.validateUppercase);
  }
  
  
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return this.uniqueNameValidator.validate(control);
  }

}


