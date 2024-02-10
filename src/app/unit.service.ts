import { Injectable } from '@angular/core';
import { Recipe } from './model/recipe.model';import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Unit } from './model/unit.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends GenericService<Unit> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllBase(): Observable<Unit[]> {
    return this.getByFilter((u: Unit) => u.baseUnit == null)
    // .pipe(map((unitArray: Team[]) => teamArray[0])
  }

  protected override getApiPath(): string {
    return 'units';
  }
  protected override mapToEntity(id: string, reponseData: any): Unit {
    return new Unit(
      id = id
    );
  }

}
