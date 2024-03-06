import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, first, map, of, tap } from "rxjs";
import { AppStateService } from "../app-state.service";
import { UnitService } from "../unit.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UnitNameUniqueValidator implements AsyncValidator {
    
    constructor(private unitService: UnitService, private appStateService: AppStateService) {}
    

    validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const unitName: string = control.value;
      if(unitName.length == 0) {
        return of(null);
      }
      return this.unitService.getByName(unitName.toUpperCase()).pipe(
        first(), //this makes the returned observable finite.
        tap(existingUnit => this.appStateService.logIfDebug("UnitNameUniqueValidatorDirective is check valid", existingUnit == undefined)),
        map(existingUnit => existingUnit == undefined ? null : { unitNameUnique: true }), 
        catchError(()=>of(null))
      );
    }
}