import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';

@Component({
  selector: 'app-recipe-ingredient-list-control',
  standalone: true,
  imports: [],
  templateUrl: './recipe-ingredient-list-control.component.html',
  styleUrl: './recipe-ingredient-list-control.component.css'
})
export class RecipeIngredientListControlComponent {

  @Output() recipeIngredientList: EventEmitter<RecipeIngredient[]> = new EventEmitter();
  


}
