import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {GameState, IGameStore} from '../model';
import {GameActions} from './game.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {GameUtils} from '../utils/game.utils';


@Injectable()
export class GameEffects {

  public state$: Observable<GameState>;
  private CACHE_SIZE = 5;

  constructor(private actions$: Actions,
              private store: Store<IGameStore>) {
    this.state$ = this.store.select(state => state.game);
  }

  addPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.addPlayer),
    map(action => action.player),
    withLatestFrom(this.store.select(state => state.game)),
    switchMap(([player, game]) => of(GameActions.addPlayerSucceeded({players: [...game.players, player]})))
  ));

  addPoint$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.addPoint),
    map(action => action.point),
    withLatestFrom(this.store.select(state => state.game)),
    switchMap(([point, game]) => {
      const players = game.players.map(player =>
        player.id === point.playerId ?
          GameUtils.sumPoints(GameUtils.setPoint(player, point)) :
          player
      );
      return of(GameActions.addPointSucceeded({players}));
    })
  ));

  undo$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.undoLatestDispatch),
    withLatestFrom(this.store.select(state => state)),
    switchMap(([action, state]) => {
      let previousStates = [...state.game.previousStates];
      const players = previousStates[previousStates.length - 1].players;
      previousStates.pop();
      if (previousStates.length > this.CACHE_SIZE) {
        previousStates = previousStates.slice(Math.max(previousStates.length - this.CACHE_SIZE, 1));
      }
      return of(GameActions.undoLatestDispatchSucceeded({players, previousStates}));
    })
  ));
}
