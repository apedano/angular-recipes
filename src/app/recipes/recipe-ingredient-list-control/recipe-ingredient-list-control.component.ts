import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecipeIngredientComponent } from "../recipe-ingredient/recipe-ingredient.component";
import { AppStateService } from '../../app-state.service';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';


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

  constructor(router: Router, public dialog: MatDialog, private appStateService: AppStateService) {
  
  }

  delete(rI: RecipeIngredient) {
    let itemIndex = this.recipeIngredients.indexOf(rI);
    this.recipeIngredients = this.recipeIngredients.filter((el, index) => index !== itemIndex);
    this.emitList();

  }

  openEditDialog(recipeIngredient: RecipeIngredient) {
    this.appStateService.logIfDebug('Edit dialog open with', recipeIngredient);
  
    let recipeIngredientDialogRef = this.dialog.open(RecipeIngredientDialogComponent, {
      width: '600px',
      data: { 'recipeIngredient': recipeIngredient} //pass data to the dialog
    });
    recipeIngredientDialogRef.afterClosed().subscribe(result => {
      this.appStateService.logIfDebug("Result from dialog", result);
      this.emitList();
    });
  }


  addRecipeIngredient($rI: RecipeIngredient) {
    this.recipeIngredients.push($rI);
    this.emitList();
  }

  private emitList(): void {
    this.appStateService.logIfDebug("Emitting RecipeIngredientList", this.recipeIngredients);
    this.recipeIngredientsOutput.emit(this.recipeIngredients);
  }


  
}
