import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppStateService } from './app-state.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  //Needed for the [(ngModel)] bindings
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatGridListModule, FormsModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCheckboxModule],
  template: `
  <main>
  <mat-toolbar>
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
      <mat-icon>more_vert</mat-icon>
    </button>
    
    <mat-menu #menu="matMenu">
      <button mat-menu-item [matMenuTriggerFor]="unita">Unita'
        <mat-icon>dialpad</mat-icon>
        <span>Unita'</span>
      </button>
      <button mat-menu-item [routerLink]="['/newIngredient']">
        <mat-icon>voicemail</mat-icon>
        <span>Nuovo ingrediente</span>
      </button>
      <button mat-menu-item disabled>
        <mat-icon>notifications_off</mat-icon>
        <span>Disable alerts</span>
      </button>
    </mat-menu>
    <mat-menu #unita="matMenu">
      <button mat-menu-item [routerLink]="['/newUnit']">
        <mat-icon>voicemail</mat-icon>
        <span>Nuova Unita'</span>
      </button>
      <button mat-menu-item disabled>
        <mat-icon>notifications_off</mat-icon>
        <span>Disable alerts</span>
      </button>
    </mat-menu>
    
    <span><a href="#" [routerLink]="['/']"><img class="brand-logo" src="/assets/cooking-book.svg" alt="logo" aria-hidden="true" width="50em" /></a></span>
    <span class="example-spacer"></span>
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <mat-checkbox [(ngModel)]="dMode" class="default-centered" (change)="toggleDebug($event)">
        Debug Mode
    </mat-checkbox>
  </mat-toolbar>
    <header class="brand-name">
    <!-- <mat-grid-list cols="4" rowHeight="100px">
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
    </mat-grid-list> -->
    
      
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