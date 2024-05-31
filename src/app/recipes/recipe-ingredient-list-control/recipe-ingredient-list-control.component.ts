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
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';


@Component({
  selector: 'app-recipe-ingredient-list-control',
  standalone: true,
  templateUrl: './recipe-ingredient-list-control.component.html',
  styleUrl: './recipe-ingredient-list-control.component.css',
  providers: [
    { //provider for the form component
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: RecipeIngredientListControlComponent
    },
    {
        //register our custom component with the NG_VALIDATORS injection token
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: RecipeIngredientListControlComponent
    }
  ],
  imports: [MatGridListModule, MatButtonModule, MatIconModule, RecipeIngredientComponent, MatDialogModule]
})
export class RecipeIngredientListControlComponent implements ControlValueAccessor, Validator {

  public recipeIngredients!: RecipeIngredient[];
  // @Output() recipeIngredientsOutput: EventEmitter<RecipeIngredient[]> = new EventEmitter();

  constructor(router: Router, public dialog: MatDialog, private appStateService: AppStateService) {
  
  }

  writeValue(obj: any): void {
    this.recipeIngredients = obj;
  }

  onChange = (recipeIngredient: RecipeIngredient[]) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  touched = false;
  onTouched = () => {};

  markAsTouched() {
    if (!this.touched) {
        this.onTouched(); //called only at the first interaction (touched is still false)
        this.touched = true;
    }
}

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  disabled = false;

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(this.touched && this.recipeIngredients.length == 0) {
      return {nustContainIngredients: true}
    }
    return null;
  }

  delete(rI: RecipeIngredient) {
    this.markAsTouched();
    if(!this.disabled) {
      let itemIndex = this.recipeIngredients.indexOf(rI);
      this.recipeIngredients = this.recipeIngredients.filter((el, index) => index !== itemIndex);
      this.onChange(this.recipeIngredients);
    }
  }

  addRecipeIngredient($rI: RecipeIngredient) {
    this.markAsTouched();
    if(!this.disabled) {
      this.recipeIngredients.push($rI);
      this.onChange(this.recipeIngredients);
    }
  }

  openEditDialog(recipeIngredient: RecipeIngredient) {
    this.markAsTouched();
    if(!this.disabled) {
      this.appStateService.logIfDebug('Edit dialog open with', recipeIngredient);
      let recipeIngredientDialogRef = this.dialog.open(RecipeIngredientDialogComponent, {
        width: '600px',
        data: { 'recipeIngredient': recipeIngredient} //pass data to the dialog
      });
      recipeIngredientDialogRef.afterClosed().subscribe(result => {
        this.appStateService.logIfDebug("Result from dialog", result);
        this.onChange(this.recipeIngredients);
      });
    }
  }
  
}
