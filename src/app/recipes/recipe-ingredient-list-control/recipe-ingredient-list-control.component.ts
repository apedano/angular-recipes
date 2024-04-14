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

  public ingredientsObs!: Observable<Ingredient[]>;
  public unitObs!: Observable<Unit[]>;

  constructor(private ingredientService: IngredientService, private unitService:UnitService, 
      router: Router, public dialog: MatDialog) {
    this.ingredientsObs = ingredientService.getAll();
    this.unitObs = unitService.getAll();
  }

  delete(rI: RecipeIngredient) {
    let itemIndex = this.recipeIngredients.indexOf(rI);
    this.recipeIngredients = this.recipeIngredients.filter((el, index) => index !== itemIndex);
  }
    
  openEditDialog(recipeIngredient: RecipeIngredient) {
    // let recipeIngredientDialogRef = this.dialog.open(RecipeIngredientComponent, {
    //   width: '600px',
    //   data: { 'recipeIngredient': recipeIngredient}
    // }); //we can add initial data here
    // recipeIngredientDialogRef.afterClosed().subscribe(result => {
    //   // edit recipe ingredient in array
    // });
  }

  addRecipeIngredient($rI: RecipeIngredient) {
    this.recipeIngredients.push($rI);
  }
  
}
