import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'add-player-dialog',
    template: `
    <div style="display: flex; flex-direction: column">
      <mat-form-field>
        <input autocomplete="false" matInput [placeholder]="'ADD_PLAYER.NAME' | translate" [formControl]="inputControl">
      </mat-form-field>
      <button mat-button (click)="onSave()" [disabled]="inputControl.invalid">{{'ADD_PLAYER.SAVE' | translate}}</button>
    </div>
  `,
    standalone: true,
    imports: [
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      ReactiveFormsModule,
      TranslateModule,
    ]
})
export class AddPlayerDialogComponent {

  public inputControl = new UntypedFormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onSave(): void {
    this.dialogRef.close(this.inputControl.value);
  }

}
