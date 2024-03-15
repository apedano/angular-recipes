import { Injectable } from '@angular/core';
import { GenericHttpBasedService } from './generic.service';
import { Ingredient } from './model/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends GenericHttpBasedService<Ingredient> {
  
  constructor(http: HttpClient) {
    super(http);
  }

  protected override getApiPath(): string {
    return 'ingredients'
  }

  protected override mapToEntity(id: string, reponseData: any): Ingredient {
    return new Ingredient(
      reponseData.name, id
    );
  }

  getByName(name: string): Observable<Ingredient> {
    return this.getByFilter((u: Ingredient) => {
      return u.name == name}).pipe(map((filtered: Ingredient[]) => filtered[0]));
  }


}
