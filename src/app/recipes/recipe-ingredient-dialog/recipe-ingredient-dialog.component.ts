import { Component, Inject } from '@angular/core';
import { RecipeIngredientComponent } from '../recipe-ingredient/recipe-ingredient.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppStateService } from '../../app-state.service';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';

@Component({
  selector: 'app-recipe-ingredient-dialog',
  standalone: true,
  imports: [MatDialogModule, RecipeIngredientComponent],
  templateUrl: './recipe-ingredient-dialog.component.html',
  styleUrl: './recipe-ingredient-dialog.component.css'
})
export class RecipeIngredientDialogComponent {

  constructor(private dialogRef: MatDialogRef<RecipeIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {recipeIngredient: RecipeIngredient}, private appStateService: AppStateService) {}

  closeAndResult($event: RecipeIngredient) {
    this.appStateService.logIfDebug("Closing RecipeIngredientComponent dialog with result:", $event);
    this.dialogRef.close($event);
  }
}
