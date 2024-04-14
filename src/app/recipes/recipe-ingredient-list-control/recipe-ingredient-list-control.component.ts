import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IngredientService } from '../../ingredient.service';
import { Ingredient } from '../../model/ingredient.model';
import { Unit } from '../../model/unit.mode';
import { UnitService } from '../../units/unit.service';
import { RecipeIngredientComponent } from "../recipe-ingredient/recipe-ingredient.component";
import { EditRecipeIngredientDialogComponent } from './edit-recipe-ingredient-dialog/edit-recipe-ingredient-dialog.component';


@Component({
  selector: 'app-recipe-ingredient-list-control',
  standalone: true,
  templateUrl: './recipe-ingredient-list-control.component.html',
  styleUrl: './recipe-ingredient-list-control.component.css',
  imports: [MatGridListModule, MatButtonModule, MatIconModule, RecipeIngredientComponent, MatDialogModule]
})
export class RecipeIngredientListControlComponent {

  @Input() public recipeIngredients!: RecipeIngredient[];
  @Output() recipeIngredientsOutput: EventEmitter<RecipeIngredient[]> = new EventEmitter();

  constructor(router: Router, public dialog: MatDialog) {

  }

  delete(rI: RecipeIngredient) {
    let itemIndex = this.recipeIngredients.indexOf(rI);
    this.recipeIngredients = this.recipeIngredients.filter((el, index) => index !== itemIndex);
  }

  openEditDialog(recipeIngredient: RecipeIngredient) {
    let editRecipeIngredientDialogRef = this.dialog.open(EditRecipeIngredientDialogComponent, {
      width: '600px', data: {
        'recipeIngredient': recipeIngredient,
      }
    });
    

  }


  addRecipeIngredient($rI: RecipeIngredient) {
    this.recipeIngredients.push($rI);
  }

}
