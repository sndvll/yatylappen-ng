import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {generate} from 'shortid';
import {GameUtils, PointName} from '../../../core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'add-point-dialog',
  template: `
    <h2 mat-dialog-title>{{'ADD_POINT.ADD' | translate }} {{('PROTOCOL.' + pointName | uppercase | translate) | lowercase}} {{'ADD_POINT.FOR'|translate}} {{playerName}}</h2>
    <div mat-dialog-content>
      <ng-container [ngSwitch]="pointName">
        <ng-container *ngSwitchCase="PointName.YATZY">
          <h2>{{'ADD_POINT.YATZY' | translate}}</h2>
        </ng-container>
        <ng-container *ngSwitchCase="PointName.SMALL_STRAIGHT">
          {{'ADD_POINT.SMALL_STRAIGHT'|translate}}
        </ng-container>
        <ng-container *ngSwitchCase="PointName.LARGE_STRAIGHT">
          {{'ADD_POINT.LARGE_STRAIGHT'|translate}}
        </ng-container>
        <ng-container *ngSwitchDefault>
           <mat-form-field appearance="fill">
             <mat-label>{{'ADD_POINT.POINTS' | translate}}</mat-label>
             <mat-select [formControl]="selectControl">
               <mat-option *ngFor="let value of possiblePoints" [value]="value">{{value}}</mat-option>
             </mat-select>
           </mat-form-field>
        </ng-container>
      </ng-container>
    </div>
    <div mat-dialog-actions style="justify-content: space-between">
      <button mat-button color="warn" [disabled]="disableStrikeButton" (click)="onStrike()">{{'ADD_POINT.STRIKE' | translate}}</button>
      <button mat-button color="primary" [disabled]="disableSaveButton" (click)="onSave()">{{'ADD_POINT.SAVE' | translate}}</button>
    </div>
  `,
})
export class AddPointDialogComponent {

  public readonly pointName: PointName;
  public readonly playerName: string;
  private readonly playerId: string;
  public possiblePoints: number[];
  PointName = PointName;
  public selectControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddPointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {playerId: string, playerName: string, pointName: PointName}) {
      this.pointName = data.pointName;
      this.playerName = data.playerName;
      this.playerId = data.playerId;
      this.possiblePoints = GameUtils.possiblePoints(this.pointName);
  }

  onSave(): void {
    this.dialogRef.close({
      id: generate(),
      playerId: this.playerId,
      name: this.pointName,
      value: this._getPoint(),
      pristine: false,
      strike: false
    });
  }

  onStrike(): void {
    this.dialogRef.close({
      id: generate(),
      playerId: this.playerId,
      name: this.pointName,
      value: 0,
      pristine: false,
      strike: true
    });
  }

  private _getPoint(): number {
    switch (this.pointName) {
      case PointName.YATZY: return 50;
      case PointName.SMALL_STRAIGHT: return 15;
      case PointName.LARGE_STRAIGHT: return 20;
      default:
        return this.selectControl.value;
    }
  }

  public get disableSaveButton(): boolean {
    return !this._getPoint();
  }

  public get disableStrikeButton(): boolean {
    return !!this.selectControl.value;
  }
}
