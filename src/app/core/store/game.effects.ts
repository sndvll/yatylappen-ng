import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {GameState, IGameStore} from '../model';
import {GameActions} from './game.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {GameUtils} from '../utils';
import {PersistenceService} from '../persistence';


@Injectable()
export class GameEffects {

  public state$: Observable<GameState>;
  private CACHE_SIZE = 5;

  constructor(private actions$: Actions,
              private store: Store<IGameStore>,
              private persistence: PersistenceService) {
    this.state$ = this.store.select(state => state.game);
  }

  addPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.addPlayer),
    map(action => action.player),
    withLatestFrom(this.store.select(state => state.game)),
    map(([player, game]) => {
      const state = {...game, players: [...game.players, player]};
      this.persistence.save(state);
      return state;
    }),
    switchMap(state => of(GameActions.addPlayerSucceeded(state)))
  ));

  addPoint$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.addPoint),
    map(action => action.point),
    withLatestFrom(this.store.select(state => state.game)),
    map(([point, game]) => {
      const players = game.players.map(player =>
        player.id === point.playerId ?
          GameUtils.sumPoints(GameUtils.setPoint(player, point)) :
          player
      );
      const state: GameState = {
        ...game,
        players,
        completed: String(GameUtils.allPlayersCompleted(players))
      };
      this.persistence.save(state);
      return state;
    }),
    switchMap(state => of(GameActions.addPointSucceeded(state)))
  ));

  undo$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.undoLatestDispatch),
    withLatestFrom(this.store.select(state => state.game)),
    switchMap(([action, game]) => {
      let previousStates = [...game.previousStates];
      const players = previousStates[previousStates.length - 1].players;
      previousStates.pop();
      if (previousStates.length > this.CACHE_SIZE) {
        previousStates = previousStates.slice(Math.max(previousStates.length - this.CACHE_SIZE, 1));
      }
      const newState: GameState = {...game, players, previousStates};
      this.persistence.save(newState);
      return of(GameActions.undoLatestDispatchSucceeded(newState));
    })
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.deleteGame),
    map(action => action.gameId),
    switchMap(gameId => {
      this.persistence.deleteGame(gameId);
      return of(GameActions.deleteGameSucceeded());
    })
  ));
}
