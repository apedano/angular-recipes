import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { UnitFormComponent } from './unit-form/unit-form.component';

const routeConfig: Routes = [
    {
        path: '',
        component: UnitFormComponent,
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
    },
];
export default routeConfig;