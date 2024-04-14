import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AppStateService } from '../../../app-state.service';
import { NewIngredientDialogComponent } from '../../../ingredients/new-ingredient-dialog/new-ingredient-dialog.component';
import { Ingredient } from '../../../model/ingredient.model';
import { RecipeIngredient } from '../../../model/recipe-ingredient.model';
import { RecipeIngredientComponent } from "../../recipe-ingredient/recipe-ingredient.component";
import { Observable } from 'rxjs';
import { Unit } from '../../../model/unit.mode';

@Component({
    selector: 'app-edit-recipe-ingredient-dialog',
    standalone: true,
    templateUrl: './edit-recipe-ingredient-dialog.component.html',
    styleUrl: './edit-recipe-ingredient-dialog.component.css',
    imports: [MatDialogModule, RecipeIngredientComponent]
})
export class EditRecipeIngredientDialogComponent {

  recipeIngredientInput: RecipeIngredient;

  constructor(private dialogRef: MatDialogRef<EditRecipeIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private appStateService: AppStateService) {
      this.recipeIngredientInput = data.recipeIngredient;
    }

  closeAndResult($event: RecipeIngredient) {
    this.appStateService.logIfDebug("Closing EditRecipeIngredientDialogComponent dialog with result:", $event);
    this.dialogRef.close($event);
  }

}
