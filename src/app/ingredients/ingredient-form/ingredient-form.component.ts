import { Component, EventEmitter, Output } from '@angular/core';
import { AppStateService } from '../../app-state.service';
import { Ingredient } from '../../model/ingredient.model';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NameUniqueValidator } from '../../directives/name-unique.validator';
import { IngredientService } from '../../ingredient.service';
import { Observer } from 'rxjs/internal/types';
import { flatMap, map, mergeMap, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from '../../shared/form-errors/form-errors.component';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, FormErrorsComponent],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css'
})
export class IngredientFormComponent {

  ingredientForm!: FormGroup;
  ingredient: Ingredient = new Ingredient('');
  @Output('newIngredient') ingredientEmitter: EventEmitter<Ingredient> = new EventEmitter();

  private nameUniqueValidator!: NameUniqueValidator<Ingredient>;



  constructor(public appStateService: AppStateService, private ingredientService: IngredientService) {
    this.nameUniqueValidator = new NameUniqueValidator(appStateService, ingredientService, false);
    const nameControl = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [
        this.nameUniqueValidator.validate.bind(this.nameUniqueValidator), //creates an AsyncValidatorFn out of the AsyncValidator
      ],
      updateOn: 'blur', //apply validation at the blur event
    });

    this.ingredientForm = new FormGroup({ name: nameControl }); //control_name: control

  }

  updateName() {
    this.ingredientForm.patchValue({
      name: 'MyIngredient'
    });
  }

  private createOrUpdateObserver: Partial<Observer<HttpResponse<{ name: string }>>> = {
    next: () => {
      this.ingredientService.getByName(this.ingredient.name)
      .subscribe({next: (ingredient) => this.ingredientEmitter.emit(ingredient)})
    },
    error: err => {
      console.log(err);
    }
  }

  onSubmit() {
    this.ingredient.name = this.name?.value;
    this.ingredientService
      .createOrUpdate(this.ingredient)
      .subscribe(this.createOrUpdateObserver);
  }

  get name() { return this.ingredientForm.get('name') }



}
