import { Injectable } from '@angular/core';
import { Observable, map, } from 'rxjs';
import { Recipe } from '../model/recipe.model';

import { HttpClient } from '@angular/common/http';
import { GenericHttpBasedService } from '../generic.service';
import { GenericNameBasedService } from '../generic.name.based.service';
import { IngredientService } from '../ingredient.service';
import { UnitService } from '../units/unit.service';
import { Ingredient } from '../model/ingredient.model';
import { RecipeIngredient } from '../model/recipe-ingredient.model';
import { Unit } from '../model/unit.mode';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends GenericHttpBasedService<Recipe> implements GenericNameBasedService<Recipe> {

  constructor(httpClient: HttpClient, private ingredientService: IngredientService, private unitService: UnitService) {
    super(httpClient);
  }

  protected override getApiPath(): string {
    return 'recipes';
  }

  protected override mapToEntity(id: string, reponseData: any): Recipe {
    console.log('Recipe responseData:', reponseData, 'id', id);
    var recipeIngredients: RecipeIngredient[] = reponseData.ingredients
      .map((recIngr: any, index: any) => {
        console.log({ "Key": index, "Value": recIngr });
        const ingr = recIngr.ingredient
        const u = recIngr.unit;
        
        return new RecipeIngredient(new Ingredient(ingr.name, ingr.id), 
        recIngr.amount, new Unit(u.name, u.id))
      })
    return new Recipe(reponseData.name, reponseData.numberOfPeople, reponseData.preparation, recipeIngredients, id);
  }
  

  getByName(name: string): Observable<Recipe> {
    return this.getByFilter((u: Recipe) => {
      return u.name == name
    }).pipe(map((filtered: Recipe[]) => filtered[0]));
  }

}

function timeout(arg0: number): any {
  throw new Error('Function not implemented.');
}

