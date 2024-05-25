import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { AppStateService } from '../../app-state.service';
import { IngredientService } from '../../ingredient.service';
import { UnitService } from '../../units/unit.service';


@Component({
  selector: 'app-recipe-ingredient',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatSelectModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './recipe-ingredient.component.html',
  styleUrl: './recipe-ingredient.component.css'
})
export class RecipeIngredientComponent implements OnInit {


  public ingredientsObs!: Observable<Ingredient[]>;
  public unitsObs!: Observable<Unit[]>;
  @Input() recipeIngredient: RecipeIngredient = new RecipeIngredient();
  @Output() value: EventEmitter<RecipeIngredient> = new EventEmitter();
  @ViewChild('ingredientSelect') ingredientSelect!: MatSelect;
  selectedIngredient: Ingredient | undefined;
  

  constructor(public dialog: MatDialog, private appStateService: AppStateService, 
    private ingredientService: IngredientService, private unitService: UnitService) {
      this.ingredientsObs = this.ingredientService.getAll();
      this.unitsObs = this.unitService.getAll();
  }

  ngOnInit(): void {
    this.appStateService.logIfDebug("OnInit RecipeIngredientComponent", this.recipeIngredient);
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

  onSubmit(recipeIngredientForm: NgForm) {
    this.value.emit(this.recipeIngredient);
    this.appStateService.logIfDebug("Submitted RecipeIngredient form", recipeIngredientForm);
    this.appStateService.logIfDebug("Submitted RecipeIngredient", this.recipeIngredient);
    //recipeIngredientForm.reset();
    this.recipeIngredient = new RecipeIngredient();
  }
}
