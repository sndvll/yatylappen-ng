import {
  AddPlayerDialogComponent,
  AddPointDialogComponent,
  PlayerComponent, PointComponent
} from './components';
import {PointNamePipe} from './pipes/point-name.pipe';

export * from './components/index';
export * from './icons/index';

export const COMPONENTS = [
  PlayerComponent,
  PointComponent,
  AddPlayerDialogComponent,
  AddPointDialogComponent
];

export const PIPES = [
  PointNamePipe
];
