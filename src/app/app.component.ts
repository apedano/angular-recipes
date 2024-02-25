import {Component} from '@angular/core';

import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppStateService } from './app-state.service';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  //Needed for the [(ngModel)] bindings



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatGridListModule, MatCheckboxModule, FormsModule],
  template: `
  <main>
  
    <header class="brand-name">
    <mat-grid-list cols="4" rowHeight="100px">
      <mat-grid-tile [colspan]="3" >
      <a [routerLink]="['/']" class="left-align-forced">    
      <img class="brand-logo" src="/assets/cooking-book.svg" alt="logo" aria-hidden="true" width="50em" />
      Ricettario di Silvia
      </a>
      </mat-grid-tile>
      <mat-grid-tile>
        <mat-checkbox [(ngModel)]="dMode" class="default-centered" (change)="toggleDebug($event)">
          Debug Mode
      </mat-checkbox>
</mat-grid-tile>  
    </mat-grid-list>
      
    </header>
  
  

  <section class="content">
    <router-outlet></router-outlet>
  </section>
</main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  dMode: boolean = this.appStateService.debugMode();

  constructor(public appStateService: AppStateService) {
  }

  toggleDebug(checkboxChange: MatCheckboxChange) {
    this.appStateService.debugMode.set(checkboxChange.checked);
  }

  title = 'default';
}