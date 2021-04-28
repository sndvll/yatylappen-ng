import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'delete-game-dialog',
  template: `
    <h2 matDialogTitle>{{'DELETE_GAME.HEADER' | translate}}</h2>
    <div mat-dialog-content>
      {{'DELETE_GAME.CONTENT' | translate}}
    </div>
    <div mat-dialog-actions style="justify-content: space-between">
      <button mat-button color="primary" (click)="dialogRef.close()">{{'DELETE_GAME.ABORT' | translate}}</button>
      <button mat-button color="warn" (click)="dialogRef.close(data.id)">{{'DELETE_GAME.DELETE' | translate}}</button>
    </div>
  `
})
export class DeleteGameDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteGameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: string }) {
  }
}
