import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewIngredientDialogComponent } from '../../ingredients/new-ingredient-dialog/new-ingredient-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';
import { Unit } from '../../model/unit.mode';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NewUnitDialogComponent } from '../../units/new-unit-dialog/new-unit-dialog.component';


@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatSelectModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './recipe-ingredient.component.html',
  styleUrl: './recipe-ingredient.component.css'
})
export class RecipeIngredientComponent {


  @Input() ingredientsObs!: Observable<Ingredient[]>;
  @Input() unitsObs!: Observable<Unit[]>;
  @Output() value!: EventEmitter<RecipeIngredient>;
  @ViewChild('ingredientSelect') ingredientSelect!: MatSelect;
  selectedIngredient: Ingredient | undefined;
  recipeIngredient: RecipeIngredient = new RecipeIngredient();

  constructor(public dialog: MatDialog) {
  }

  openNewIngredientDialog() {
    let newIngredientDialogRef = this.dialog.open(NewIngredientDialogComponent); //we can add initial data here
    newIngredientDialogRef.afterClosed().subscribe(result => {
      this.recipeIngredient.ingredient = result;
    });
  }

  openNewUnitDialog() {
    let newUnitDialogRef = this.dialog.open(NewUnitDialogComponent, {
      width: '600px',
    }); //we can add initial data here
    newUnitDialogRef.afterClosed().subscribe(result => {
      this.recipeIngredient.unit = result;
    });
  }

  onSubmit(_t13: NgForm) {
    throw new Error('Method not implemented.');
  }
}
