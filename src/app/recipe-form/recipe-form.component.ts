import { Component } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { GenericFormComponent } from '../generic.form.component';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent extends GenericFormComponent<Recipe> {
  

  constructor(private appStateService: AppStateService, private recipeService: RecipeService,  router: Router) {
    super(recipeService, router);
  }

  protected override emptyEntity(): Recipe {
    throw new Error('Method not implemented.');
  }
  protected override initEntityForm(): Observable<FormGroup<any>> {
    throw new Error('Method not implemented.');
  }
  protected override getRedirectUrlAfterSave(): any[] {
    throw new Error('Method not implemented.');
  }

}
