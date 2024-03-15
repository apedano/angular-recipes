import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from './model/recipe.model';

import { HttpClient } from '@angular/common/http';
import { GenericHttpBasedService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends GenericHttpBasedService<Recipe> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  protected override getApiPath(): string {
    return 'recipes';
  }
  protected override mapToEntity(id: string, reponseData: any): Recipe {
    throw new Error('Method not implemented.');
  }

}

