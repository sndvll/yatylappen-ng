import {createAction, props} from '@ngrx/store';
import {GameState, Player, Point} from '../model';

export enum GameActionTypes {
  AddPlayerStarted = '[yatzy] add player started',
  AddPlayerSucceeded = '[yatzy] add player succeeded',
  AddPointStarted = '[yatzy] add point started',
  AddPointSucceeded = '[yatzy] add point succeeded',
  UndoLatestDispatch = '[yatzy] undo latest dispatch started',
  UndoLatestDispatchSucceeded = '[yatzy] undo latest dispatch succeeded'
}

const addPlayer = createAction(GameActionTypes.AddPlayerStarted, props<{player: Player}>());
const addPlayerSucceeded = createAction(GameActionTypes.AddPlayerSucceeded, props<{players: Player[]}>());
const addPoint = createAction(GameActionTypes.AddPointStarted, props<{point: Point}>());
const addPointSucceeded = createAction(GameActionTypes.AddPointSucceeded, props<{players: Player[]}>());
const undoLatestDispatch = createAction(GameActionTypes.UndoLatestDispatch);
const undoLatestDispatchSucceeded = createAction(GameActionTypes.UndoLatestDispatchSucceeded, props<{players: Player[], previousStates: GameState[]}>());

export const GameActions = {
  addPlayer,
  addPlayerSucceeded,
  addPoint,
  addPointSucceeded,
  undoLatestDispatch,
  undoLatestDispatchSucceeded
};
