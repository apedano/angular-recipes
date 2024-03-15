import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
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