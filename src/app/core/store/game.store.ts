import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { GameState, Player, Point } from '../model';
import { PersistenceService } from '../persistence';
import { GameUtils } from '../utils';
import { nanoid as generate } from 'nanoid';

const initState: GameState = (() => {
  const now = new Date();
  return {
    players: [],
    previousStates: [],
    disableAddPlayerButton: false,
    disableUndoButton: true,
    id: generate(),
    created: now.toISOString(),
    lastChanged: now.toISOString(),
    completed: 'false',
  };
})();

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initState),
  withMethods((store, persistence = inject(PersistenceService)) => ({
    addPlayer(player: Player): void {
      const current: GameState = {
        players: store.players(),
        previousStates: store.previousStates(),
        disableAddPlayerButton: store.disableAddPlayerButton(),
        disableUndoButton: store.disableUndoButton(),
        id: store.id(),
        created: store.created(),
        lastChanged: store.lastChanged(),
        completed: store.completed(),
      };
      const newPlayers = [...current.players, player];
      const newState: GameState = {
        ...current,
        players: newPlayers,
        previousStates: [...current.previousStates, current],
        disableUndoButton: false,
      };
      persistence.save(newState as GameState);
      patchState(store, newState);
    },

    addPoint(point: Point): void {
      const current: GameState = {
        players: store.players(),
        previousStates: store.previousStates(),
        disableAddPlayerButton: store.disableAddPlayerButton(),
        disableUndoButton: store.disableUndoButton(),
        id: store.id(),
        created: store.created(),
        lastChanged: store.lastChanged(),
        completed: store.completed(),
      };
      const players = current.players.map(p =>
        p.id === point.playerId
          ? GameUtils.sumPoints(GameUtils.setPoint(p, point))
          : p
      );
      const completed = String(GameUtils.allPlayersCompleted(players));
      const newState: GameState = {
        ...current,
        players,
        previousStates: [...current.previousStates, current],
        completed,
        disableUndoButton: false,
        disableAddPlayerButton: true,
      };
      persistence.save(newState as GameState);
      patchState(store, newState);
    },

    undo(): void {
      const previousStates = store.previousStates();
      const current: GameState = {
        players: store.players(),
        previousStates,
        disableAddPlayerButton: store.disableAddPlayerButton(),
        disableUndoButton: store.disableUndoButton(),
        id: store.id(),
        created: store.created(),
        lastChanged: store.lastChanged(),
        completed: store.completed(),
      };
      const prevStates = [...previousStates];
      const lastState = prevStates.pop();
      if (!lastState) return;
      const newState: GameState = {
        ...current,
        players: lastState.players,
        previousStates: prevStates,
        disableUndoButton: prevStates.length === 0,
        disableAddPlayerButton: lastState.players.length !== 0,
      };
      persistence.save(newState as GameState);
      patchState(store, newState);
    },

    loadGame(game: GameState): void {
      patchState(store, game);
    },

    restartGame(): void {
      const now = new Date();
      const newState: GameState = {
        players: [],
        previousStates: [],
        disableAddPlayerButton: false,
        disableUndoButton: true,
        id: generate(),
        created: now.toISOString(),
        lastChanged: now.toISOString(),
        completed: 'false',
      };
      persistence.save(newState);
      patchState(store, newState);
    },

    deleteGame(gameId: string): void {
      persistence.deleteGame(gameId);
      const now = new Date();
      patchState(store, {
        players: [],
        previousStates: [],
        disableAddPlayerButton: false,
        disableUndoButton: true,
        id: generate(),
        created: now.toISOString(),
        lastChanged: now.toISOString(),
        completed: 'false',
      });
    },

    loadLastGame(): void {
      persistence.loadLastGame().subscribe((game) => {
        if (game) {
          patchState(store, game);
        }
      });
    },

    loadGameById(id: string): void {
      persistence.get(id).subscribe((game) => {
        if (game) {
          patchState(store, game);
        }
      });
    },
  })),
  withHooks({
    onInit(store) {
      const persistence = inject(PersistenceService);
      if (persistence.autoLoadSetting) {
        store.loadLastGame();
      }
    },
  })
);
