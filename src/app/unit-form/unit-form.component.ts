import { Component, OnInit } from '@angular/core';
import { Unit } from '../model/unit.mode';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { UnitService } from '../unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { AppStateService } from '../app-state.service';
import { AllCapsDirective } from '../directives/all-caps.directive';
import { BaseUnitFormValidatorDirective} from '../directives/base-unit-form-validator.directive';
import { NameUniqueValidatorDirective } from '../directives/name-unique-validator.directive';
import { FormErrorsComponent } from '../shared/form-errors/form-errors.component';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatGridListModule, MatInputModule, MatFormFieldModule, 
    MatSelectModule, MatCheckboxModule, MatButtonModule, AllCapsDirective, BaseUnitFormValidatorDirective, NameUniqueValidatorDirective, FormErrorsComponent],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent implements OnInit {
  baseUnits$: Observable<Unit[]> | undefined;
  unit: Unit = new Unit();
  isBaseUnit: boolean = false;
  initialized: boolean = false;
  
  //use https://github.com/apedano/angular-f1-app/blob/main/src/app/team/team-form/team-form.component.ts

  constructor(public unitService: UnitService, router: Router, private currentRoute: ActivatedRoute, public appStateService: AppStateService) {
      
  }

  private createAndStoreObserver: Partial<Observer<any>> = {
    next: () => {
        // this.router.navigate(this.getRedirectUrlAfterSave());
        alert("Item stored");
    },
    error: err => {
        console.log(err);
    }
}
  
  ngOnInit(): void {
    this.baseUnits$ = this.unitService.getAllBase();
    this.isBaseUnit = this.unit.baseUnit == undefined;
    this.initialized = true;
  }

  onCheckboxChange(e: MatCheckboxChange) {
    if(this.isBaseUnit) {
      this.unit.baseUnit = undefined;  
      this.unit.conversionRatio = undefined;
    }
  }
    
  onSubmit(unitForm: NgForm) {
    this.appStateService.logIfDebug("form submitted", unitForm, unitForm.form.controls['unitName']);
    this.appStateService.logIfDebug("submitted unit", this.unit);
    if(unitForm.valid) {
      this.unitService.createOrUpdate(this.unit).subscribe(this.createAndStoreObserver);

    } else {
      console.log("invalid form no submit allowed")
    }
  }
  

}
