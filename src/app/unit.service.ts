import { Injectable } from '@angular/core';
import { Recipe } from './model/recipe.model';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Unit } from './model/unit.mode';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends GenericService<Unit> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  protected override getApiPath(): string {
    throw new Error('Method not implemented.');
  }
  protected override mapToEntity(id: string, reponseData: any): Recipe {
    throw new Error('Method not implemented.');
  }

}
