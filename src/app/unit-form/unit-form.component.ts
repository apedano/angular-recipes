import { Component, OnInit } from '@angular/core';
import { Unit } from '../model/unit.mode';
import { GenericFormComponent } from '../generic.form.component';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UnitService } from '../unit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-form',
  standalone: true,
  imports: [],
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent extends GenericFormComponent<Unit> implements OnInit {
  
  //use https://github.com/apedano/angular-f1-app/blob/main/src/app/team/team-form/team-form.component.ts

  constructor(unitService: UnitService, router: Router, private currentRoute: ActivatedRoute) {
    super(unitService, router)
  }
  
  ngOnInit(): void {
    this.initEntity(this.currentRoute);
  }


  
  
  protected override emptyEntity(): Unit {
    return new Unit();
  }

  
  protected override initEntityForm(): Observable<FormGroup<any>> {
    throw new Error('Method not implemented.');
  }
  protected override mapFormToEntity(): void {
    throw new Error('Method not implemented.');
  }
  protected override getRedirectUrlAfterSave(): any[] {
    throw new Error('Method not implemented.');
  }

}
