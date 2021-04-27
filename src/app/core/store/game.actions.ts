import {createAction, props} from '@ngrx/store';
import {GameState, Player, Point} from '../model';

export enum GameActionTypes {
  AddPlayerStarted = '[yatzy] add player started',
  AddPlayerSucceeded = '[yatzy] add player succeeded',
  AddPointStarted = '[yatzy] add point started',
  AddPointSucceeded = '[yatzy] add point succeeded',
  UndoLatestDispatch = '[yatzy] undo latest dispatch started',
  UndoLatestDispatchSucceeded = '[yatzy] undo latest dispatch succeeded',
  RestartGame = '[yatzy] restart game',
  LoadGame = '[yatzy] load game',
}

const addPlayer = createAction(GameActionTypes.AddPlayerStarted, props<{player: Player}>());
const addPlayerSucceeded = createAction(GameActionTypes.AddPlayerSucceeded, props<{players: Player[]}>());
const addPoint = createAction(GameActionTypes.AddPointStarted, props<{point: Point}>());
const addPointSucceeded = createAction(GameActionTypes.AddPointSucceeded, props<{players: Player[], completed: boolean}>());
const undoLatestDispatch = createAction(GameActionTypes.UndoLatestDispatch);
const undoLatestDispatchSucceeded = createAction(GameActionTypes.UndoLatestDispatchSucceeded, props<{players: Player[], previousStates: GameState[]}>());
const restartGame = createAction(GameActionTypes.RestartGame);
const loadGame = createAction(GameActionTypes.LoadGame, props<{game: GameState}>());

export const GameActions = {
  addPlayer,
  addPlayerSucceeded,
  addPoint,
  addPointSucceeded,
  undoLatestDispatch,
  undoLatestDispatchSucceeded,
  restartGame,
  loadGame
};
