import {GameState} from '../model';
import {Action, createReducer, on} from '@ngrx/store';
import {GameActions} from './game.actions';

export const initAppState: GameState = {
  players: [
    {name: 'Emil', id: 'abcde123'}
  ],
  previousStates: [],
  disableAddPlayerButton: false,
  disableUndoButton: true
};

const reducer = createReducer(initAppState,
  on(GameActions.addPlayer, state =>
    ({...state, previousStates: [...state.previousStates, state]})),
  on(GameActions.addPlayerSucceeded, (state, { players }) =>
    ({...state, players, disableUndoButton: disableUndoButton(state.previousStates.length)})),
  on(GameActions.addPoint, state =>
    ({...state, previousStates: [...state.previousStates, state], disableAddPlayerButton: true})),
  on(GameActions.addPointSucceeded, (state, { players }) =>
    ({...state, players, disableUndoButton: disableUndoButton(state.previousStates.length)})),
  on(GameActions.undoLatestDispatchSucceeded, (state, {players, previousStates}) =>
    ({...state, players, previousStates, disableUndoButton: disableUndoButton(previousStates.length), disableAddPlayerButton: players.length !== 0}))
);

const disableUndoButton = (length: number) => {
  return length === 0;
};

export function reducers(state: GameState | undefined, action: Action): GameState {
  return reducer(state, action);
}
