import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AppStateService } from '../../app-state.service';
import { Unit } from '../../model/unit.mode';
import { UnitFormComponent } from "../unit-form/unit-form.component";

@Component({
    selector: 'app-new-unit-dialog',
    standalone: true,
    templateUrl: './new-unit-dialog.component.html',
    styleUrl: './new-unit-dialog.component.css',
    imports: [UnitFormComponent, MatDialogModule]
})
export class NewUnitDialogComponent {
  
  constructor(private dialogRef: MatDialogRef<NewUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private appStateService: AppStateService){} 

    closeAndResult($event: Unit) {
      this.appStateService.logIfDebug("Closing NewIngredientDialogComponent dialog with result:", $event);
      this.dialogRef.close($event);
    }

}
