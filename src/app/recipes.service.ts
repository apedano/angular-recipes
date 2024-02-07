import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from './model/recipe.model';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends GenericService<Recipe> {

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

