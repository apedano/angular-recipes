import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { UnitFormComponent } from './units/unit-form/unit-form.component';
import { IngredientFormComponent } from './ingredients/ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'newRecipe',
        component: RecipeFormComponent,
        title: 'New Recipe',
    },
    {
        path: 'newUnit',
        component: UnitFormComponent,
        title: 'New Unit',
    },
    {
        path: 'newIngredient',
        component: IngredientFormComponent,
        title: 'New Ingredient',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
    },
];
export default routeConfig;