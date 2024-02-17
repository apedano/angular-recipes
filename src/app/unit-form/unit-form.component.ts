import { Component, OnInit } from '@angular/core';
import { Unit } from '../model/unit.mode';
import { GenericFormComponent } from '../generic.form.component';
import { FormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UnitService } from '../unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent implements OnInit {
  baseUnits$: Observable<Unit[]> | undefined;
  unit: Unit = new Unit();
  isBaseUnit: boolean = false;
  
    tiles: Tile[] = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];

  //use https://github.com/apedano/angular-f1-app/blob/main/src/app/team/team-form/team-form.component.ts

  constructor(private unitService: UnitService, router: Router, private currentRoute: ActivatedRoute) {
    
  }
  
  ngOnInit(): void {
    this.baseUnits$ = this.unitService.getAllBase();
    this.isBaseUnit = this.unit.baseUnit == undefined;
  }

  onCheckboxChange(e: MatCheckboxChange) {
    console.log("onCheckboxChange called status", e.checked)
    if(this.isBaseUnit) {
      this.unit.baseUnit = undefined;  
    }
  }
    
  onSubmit() {
    console.log("form submitted");
  }
  

}
