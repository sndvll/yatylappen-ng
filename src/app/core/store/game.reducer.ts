import {GameState} from '../model';
import {Action, createReducer, on} from '@ngrx/store';
import {GameActions} from './game.actions';
import {generate} from 'shortid';

const createInitState = (): GameState => {
  const now = new Date();
  return ({
    players: [
      // {name: 'Emil', id: 'abcde123'}
    ],
    previousStates: [],
    disableAddPlayerButton: false,
    disableUndoButton: true,
    id: generate(),
    created: now.toISOString(),
    lastChanged: now.toISOString(),
    completed: 'false'
  });
};

const reducer = createReducer(createInitState(),
  on(GameActions.addPlayer, state =>
    ({...state, previousStates: [...state.previousStates, state]})),
  on(GameActions.addPlayerSucceeded, (state, { players }) =>
    ({...state, players, disableUndoButton: disableUndoButton(state.previousStates.length)})),
  on(GameActions.addPoint, state =>
    ({...state, previousStates: [...state.previousStates, state]})),
  on(GameActions.addPointSucceeded, (state, { players, completed }) =>
    ({...state, players, disableUndoButton: disableUndoButton(state.previousStates.length), disableAddPlayerButton: true, completed})),
  on(GameActions.undoLatestDispatchSucceeded, (state, {players, previousStates}) =>
    ({...state, players, previousStates, disableUndoButton: disableUndoButton(previousStates.length), disableAddPlayerButton: players.length !== 0})),
  on(GameActions.restartGame, () => ({...createInitState()})),
  on(GameActions.loadGame, (state, {game}) => ({...game})),
  on(GameActions.deleteGameSucceeded, () => ({...createInitState()}))
);

const disableUndoButton = (length: number) => {
  return length === 0;
};



export function reducers(state: GameState | undefined, action: Action): GameState {
  return reducer(state, action);
}

