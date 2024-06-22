import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, forkJoin, map } from 'rxjs';
import { Recipe } from './model/recipe.model';

import { HttpClient } from '@angular/common/http';
import { GenericHttpBasedService } from './generic.service';
import { GenericNameBasedService } from './generic.name.based.service';
import { IngredientService } from './ingredient.service';
import { UnitService } from './units/unit.service';
import { Ingredient } from './model/ingredient.model';
import { RecipeIngredient } from './model/recipe-ingredient.model';
import { Unit } from './model/unit.mode';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends GenericHttpBasedService<Recipe> implements GenericNameBasedService<Recipe>{

  constructor(httpClient: HttpClient, private ingredientService: IngredientService, private unitService: UnitService) {
    super(httpClient);
  }

  protected override getApiPath(): string {
    return 'recipes';
  }
  
  protected override mapToEntity(id: string, reponseData: any): Recipe {
    console.log('Recipe responseData:', reponseData, 'id', id);
    var loadedRecipeIngredients: RecipeIngredient[] = reponseData.ingredients.map((recIngr: any, index: any) => {
      console.log({ "Key": index, "Value": recIngr });
      const ingredient: Observable<Ingredient> = this.ingredientService.getById(recIngr.ingredient.id);
      const unit: Observable<Unit> = this.unitService.getById(recIngr.unit.id);
      forkJoin([ingredient, unit]).subscribe(([ingredient, unit]) => {
        // All data available
        return new RecipeIngredient(ingredient, recIngr.amount, unit);
      });


    });
    return new Recipe(
      reponseData.name, 0, reponseData.preparation, loadedRecipeIngredients, id
    );
  }

  getByName(name: string): Observable<Recipe> {
    return this.getByFilter((u: Recipe) => {
      return u.name == name
    }).pipe(map((filtered: Recipe[]) => filtered[0]));
  }

}

