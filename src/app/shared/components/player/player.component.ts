import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Player, PointName, Point} from '../../../core';
import {MatDialog} from '@angular/material/dialog';
import {AddPointDialogComponent} from '../add-point-dialog/add-point-dialog.component';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['./player.component.scss']
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

