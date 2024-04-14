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
import { UnitService } from '../../units/unit.service';
import { Unit } from '../../model/unit.mode';
import { RecipeIngredientListControlComponent } from "../recipe-ingredient-list-control/recipe-ingredient-list-control.component";


@Component({
    selector: 'app-recipe-form',
    standalone: true,
    templateUrl: './recipe-form.component.html',
    styleUrl: './recipe-form.component.css',
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RecipeIngredientComponent, RecipeIngredientListControlComponent]
})
// export class RecipeFormComponent extends GenericFormComponent<Recipe> {
export class RecipeFormComponent {

  public recipe: Recipe = new Recipe();
  public ingredientsObs!: Observable<Ingredient[]>;
  public unitObs!: Observable<Unit[]>;

  constructor(private ingredientService: IngredientService, private unitService:UnitService, router: Router, public dialog: MatDialog) {
    // super(recipeService, router);
    this.ingredientsObs = ingredientService.getAll();
    this.unitObs = unitService.getAll();
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
