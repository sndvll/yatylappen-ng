import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player, PointName, Point} from '../../../core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddPointDialogComponent} from '../add-point-dialog/add-point-dialog.component';
import {filter, take} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {PointComponent} from '../point/point.component';

@Component({
    selector: 'player',
    templateUrl: 'player.component.html',
    styleUrls: ['./player.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      PointComponent,
      MatDialogModule,
    ]
})
export class PlayerComponent {

  @Input() player!: Player;

  @Output() savePoint = new EventEmitter<Point>();
  public PointName = PointName;

  constructor(public dialog: MatDialog) {
  }

  public onOpenAddPointDialog(pointName: string): void {
    const dialogRef = this.dialog.open(AddPointDialogComponent, {
      data: {
        pointName,
        playerId: this.player.id,
        playerName: this.player.name
      }
    });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(point => !!point),
      )
      .subscribe((point: Point) => this.savePoint.emit(point));
  }

}
