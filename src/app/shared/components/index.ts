import {PlayerComponent} from './player/player.component';
import {PointComponent} from './point/point.component';
import {AddPlayerDialogComponent} from './add-player-dialog/add-player-dialog.component';
import {AddPointDialogComponent} from './add-point-dialog/add-point-dialog.component';
import {DeleteGameDialogComponent} from './delete-game-dialog/delete-game-dialog.component';

export * from './player/player.component';
export * from './point/point.component';
export * from './add-player-dialog/add-player-dialog.component';
export * from './add-point-dialog/add-point-dialog.component';

export const COMPONENTS = [
  PlayerComponent,
  PointComponent,
  AddPlayerDialogComponent,
  AddPointDialogComponent,
  DeleteGameDialogComponent
];
