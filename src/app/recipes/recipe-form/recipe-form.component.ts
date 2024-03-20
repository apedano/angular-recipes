import { Component } from '@angular/core';

import { GenericFormComponent } from '../../generic.form.component';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Ingredient } from '../../model/ingredient.model';
import { IngredientService } from '../../ingredient.service';
import { RecipeIngredientComponent } from "../recipe-ingredient/recipe-ingredient.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RecipeIngredientComponent]
})
// export class RecipeFormComponent extends GenericFormComponent<Recipe> {
export class RecipeFormComponent {

  
  public ingredientsObs!: Observable<Ingredient[]>;

  constructor( private ingredientService: IngredientService, router: Router, public dialog: MatDialog) {
    // super(recipeService, router);
    this.ingredientsObs = ingredientService.getAll();
  }

  // protected override emptyEntity(): Recipe {
  //   return new Recipe();
  // }

  // protected override initEntityForm(): Observable<FormGroup<any>> {
  //   return of(new FormGroup({firstName: new FormControl()}));          

  // }

  // protected override getRedirectUrlAfterSave(): any[] {
  //   return ['/'];
  // }



}
