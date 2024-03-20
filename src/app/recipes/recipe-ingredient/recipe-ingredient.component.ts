import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewIngredientDialogComponent } from '../../ingredients/new-ingredient-dialog/new-ingredient-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';


@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatSelectModule, MatButtonModule],
  templateUrl: './recipe-ingredient.component.html',
  styleUrl: './recipe-ingredient.component.css'
})
export class RecipeIngredientComponent {

  @Input() ingredientsObs!: Observable<Ingredient[]>;
  @Output() value!: EventEmitter<RecipeIngredient>;

  constructor(public dialog: MatDialog){
  }

  openNewIngredientDialog() {
    let newIngredientDialogRef = this.dialog.open(NewIngredientDialogComponent); //we can add initial data here
    
    newIngredientDialogRef.afterClosed().subscribe(result => {
      console.log("Dialog rsult", result); // new ingredient
    });
  }
}
