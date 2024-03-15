import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, first, map, of, tap } from "rxjs";
import { AppStateService } from "../app-state.service";
import { Injectable, Input } from "@angular/core";
import { NameEntity } from "../model/name-entiry.model";
import { GenericNameBasedService } from "../generic.name.based.service";

// @Injectable({ providedIn: 'root' })
export class NameUniqueValidator<T extends NameEntity> implements AsyncValidator {

  constructor(private appStateService: AppStateService, private modelService: GenericNameBasedService<T>, private validateUppercase: boolean) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const name: string = control.value;
    this.appStateService.logIfDebug("Called NameUniqueValidator with", name)
    if (name.length == 0) {
      return of(null);
    }
    let nameToCheck = this.validateUppercase ? name.toUpperCase() : name;
    return this.modelService.getByName(nameToCheck).pipe(
      first(), //this makes the returned observable finite.
      tap(existingUnit => this.appStateService.logIfDebug("NameUniqueValidatorDirective check: ", existingUnit == undefined)),
      map(existingUnit => existingUnit == undefined ? null : { nameUnique: true }),
      catchError(() => of(null))
    );
  }
}