import { Component } from '@angular/core';

import { GenericFormComponent } from '../../generic.form.component';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { IngredientFormComponent } from '../../ingredients/ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {

  constructor(public dialog: MatDialog) {}
  
  // constructor(private recipeService: RecipeService, router: Router) {
  //   super(recipeService, router);
  // }   
  
  // protected override emptyEntity(): Recipe {
  //   throw new Error('Method not implemented.');
  // }
  // protected override initEntityForm(): Observable<FormGroup<any>> {
  //   throw new Error('Method not implemented.');
  // }
  // protected override getRedirectUrlAfterSave(): any[] {
  //   throw new Error('Method not implemented.');
  // }


  openNewIngredientDialog() {
    let newIngredientDialogRef = this.dialog.open(IngredientFormComponent); //we can add initial data here
    // this.dialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda',
    //   },
    // });

    //https://material.angular.io/components/dialog/overview
    newIngredientDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
