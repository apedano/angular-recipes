import { Component } from '@angular/core';

import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RecipeIngredientComponent } from "../recipe-ingredient/recipe-ingredient.component";
import { CommonModule } from '@angular/common';
import { RecipeIngredientListControlComponent } from "../recipe-ingredient-list-control/recipe-ingredient-list-control.component";
import { AppStateService } from '../../app-state.service';
import { FormErrorsComponent } from "../../shared/form-errors/form-errors.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { NameUniqueValidator } from '../../directives/name-unique.validator';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { RecipeIngredient } from '../../model/recipe-ingredient.model';
import { IdEntityNotFoundError } from '../../generic.service';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  imports: [CommonModule, MatDialogModule, MatCardModule, MatInputModule, MatFormFieldModule, MatGridListModule, MatButtonModule, MatIconModule, TextFieldModule, ReactiveFormsModule, RecipeIngredientComponent, RecipeIngredientListControlComponent, FormErrorsComponent]
})
// export class RecipeFormComponent extends GenericFormComponent<Recipe> {
export class RecipeFormComponent {

  public recipe!: Recipe;
  public recipeForm!: FormGroup;
  private nameUniqueValidator!: NameUniqueValidator<Recipe>;
  public loaded: boolean = false;
  public error: Error | undefined;
  public hasError: boolean = false;

  constructor(private recipeService: RecipeService,
    private router: Router, currentRoute: ActivatedRoute, public dialog: MatDialog, public appStateService: AppStateService) {
    // super(recipeService, router);
    currentRoute.params
      .subscribe(
        (updatedParams: Params) => {
          if (updatedParams['id']) {
            let id = updatedParams['id'];
            this.recipeService.getById(id)
            .subscribe(
              {
                next: entity => {
                  this.recipe = entity;
                  this.onEntityLoaded();
                },
                error: (err: IdEntityNotFoundError) => {
                  console.error(err);
                  this.hasError = true;
                  this.loaded = true;
                  this.error = err;
                }
              }
            );
          } else {
            this.recipe = new Recipe();
            this.onEntityLoaded();
          }
        }
      );


  }

  onEntityLoaded() {
    this.nameUniqueValidator = new NameUniqueValidator(this.appStateService, this.recipeService, false);

    const nameControl = new FormControl<String>(this.recipe.name!, {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [
        this.nameUniqueValidator.validate.bind(this.nameUniqueValidator), //creates an AsyncValidatorFn out of the AsyncValidator
      ],
      updateOn: 'blur', //apply validation at the blur event
    });
    const ingredientsControl = new FormControl<RecipeIngredient[]>(this.recipe.ingredients!, { validators: [Validators.required] });
    const preparationControl = new FormControl<String>(this.recipe.preparation!, { validators: [Validators.minLength(10)] });
    //const preparationControl = new FormControl<String> ('', {});

    this.recipeForm = new FormGroup({
      recipeNameControl: nameControl,
      ingredientsControl: ingredientsControl,
      preparationControl: preparationControl
    });
    this.loaded = true;
  }

  get name() { return this.recipeForm.get('recipeNameControl') }
  get ingredients() { return this.recipeForm.get('ingredientsControl') }
  get preparation() { return this.recipeForm.get('preparationControl') }

  onSubmit() {
    // this.ingredient.name = this.name?.value;
    this.recipe.name = this.name?.value;
    this.recipe.ingredients = this.ingredients?.value;
    this.recipe.preparation = this.preparation?.value;
    this.recipeService
      .createOrUpdate(this.recipe)
      .subscribe(recipe => {
        this.appStateService.logIfDebug("Recipe saved, redirecting...");
        this.router.navigate(['/']);
      });
  }


}
