import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'add-player-dialog',
  template: `
    <div style="display: flex; flex-direction: column">
      <mat-form-field>
        <input matInput [placeholder]="'ADD_PLAYER.NAME' | translate" [formControl]="inputControl">
      </mat-form-field>
      <button mat-button (click)="onSave()" [disabled]="inputControl.invalid">{{'ADD_PLAYER.SAVE' | translate}}</button>
    </div>
  `,
})
export class AddPlayerDialogComponent {

  public inputControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onSave(): void {
    this.dialogRef.close(this.inputControl.value);
  }

}
