import { Component, OnInit } from '@angular/core';
import { Unit } from '../model/unit.mode';
import { GenericFormComponent } from '../generic.form.component';
import { FormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UnitService } from '../unit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent implements OnInit {
  baseUnits$: Observable<Unit[]> | undefined;
  unit: Unit = new Unit();
  
  //use https://github.com/apedano/angular-f1-app/blob/main/src/app/team/team-form/team-form.component.ts

  constructor(private unitService: UnitService, router: Router, private currentRoute: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.baseUnits$ = this.unitService.getAllBase();
  }
    
  onSubmit() {
    console.log("form submitted");
  }
  

}
