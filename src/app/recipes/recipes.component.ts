import { Component } from '@angular/core';
import { AppStateService } from '../app-state.service';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, MatGridListModule, RouterModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  public recipes$!: Observable<Recipe[]>

  constructor(appStateService: AppStateService, public recipeService: RecipeService) {
    console.log("Constructing RecipesComponent")
    this.recipes$ = recipeService.getAll();
  }

}
