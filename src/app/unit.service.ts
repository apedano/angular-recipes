import { Injectable } from '@angular/core';
import { GenericHttpBasedService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Unit } from './model/unit.mode';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends GenericHttpBasedService<Unit> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getByName(name: string): Observable<Unit> {
    return this.getByFilter((u: Unit) => {
      return u.name == name}).pipe(map((filtered: Unit[]) => filtered[0]));
  }

  getAllBase(): Observable<Unit[]> {
    return this.getByFilter((u: Unit) => {
      console.log("Filter on ", u, u.baseUnit == undefined)
      return u.baseUnit == undefined})
    // .pipe(map((unitArray: Team[]) => teamArray[0])
  }

  protected override getApiPath(): string {
    return 'units';
  }

  protected override mapToEntity(id: string, reponseData: any): Unit {
    console.log('Unit responseData:', reponseData)
    return new Unit(
      reponseData.name,reponseData.baseUnit, reponseData.conversionRatio,id
    );
  }
}
