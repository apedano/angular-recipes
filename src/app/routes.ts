import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { UnitFormComponent } from './units/unit-form/unit-form.component';
import { IngredientFormComponent } from './ingredients/ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipesComponent } from './recipes/recipes.component';


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        title: 'Recipes',
    },
    {
        path: 'recipe/:id',
        component: RecipeFormComponent,
        title: 'Edit recipe',
    },
    {
        path: 'recipe/new',
        component: RecipeFormComponent,
        title: 'New recipe',
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