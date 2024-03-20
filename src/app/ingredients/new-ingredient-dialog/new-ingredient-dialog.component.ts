import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IngredientFormComponent } from "../ingredient-form/ingredient-form.component";
import { Ingredient } from '../../model/ingredient.model';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'app-new-ingredient-dialog',
  standalone: true,
  templateUrl: './new-ingredient-dialog.component.html',
  styleUrl: './new-ingredient-dialog.component.css',
  imports: [MatDialogModule, IngredientFormComponent]
})
export class NewIngredientDialogComponent {

  constructor(private dialogRef: MatDialogRef<NewIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private appStateService: AppStateService) {}

  closeAndResult($event: Ingredient) {
    this.appStateService.logIfDebug("Closing NewIngredientDialogComponent dialog with result:", $event);
    this.dialogRef.close($event);
  }

}
