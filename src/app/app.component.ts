import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  template: `
  <main>
  <a [routerLink]="['/']">
    <header class="brand-name">
      <img class="brand-logo" src="/assets/cooking-book.svg" alt="logo" aria-hidden="true" width="50em" />
      Ricettario di Silvia
    </header>
  </a>
  <section class="content">
    <router-outlet></router-outlet>
  </section>
</main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
}
