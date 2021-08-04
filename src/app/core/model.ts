export enum PointName {
  TOTAL_TOP = 'total_top',
  TOTAL = 'total',
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = 'six',
  BONUS = 'bonus',
  PAIR = 'pair',
  TWO_PAIR = 'two_pair',
  TRIPS = 'trips',
  FOUR_OF_A_KIND = 'four_of_a_kind',
  FULL_HOUSE = 'full_house',
  SMALL_STRAIGHT = 'small_straight',
  LARGE_STRAIGHT = 'large_straight',
  CHANCE = 'chance',
  YATZY = 'yatzy'
}

export enum PointableName {

}

export interface Player {
  name: string;
  id: string;
  completed: boolean;
  [PointName.TOTAL_TOP]?: Point;
  [PointName.TOTAL]?: Point;
  [PointName.ONE]?: Point;
  [PointName.TWO]?: Point;
  [PointName.THREE]?: Point;
  [PointName.FOUR]?: Point;
  [PointName.FIVE]?: Point;
  [PointName.SIX]?: Point;
  [PointName.BONUS]?: Point;
  [PointName.PAIR]?: Point;
  [PointName.TWO_PAIR]?: Point;
  [PointName.TRIPS]?: Point;
  [PointName.FOUR_OF_A_KIND]?: Point;
  [PointName.FULL_HOUSE]?: Point;
  [PointName.SMALL_STRAIGHT]?: Point;
  [PointName.LARGE_STRAIGHT]?: Point;
  [PointName.CHANCE]?: Point;
  [PointName.YATZY]?: Point;
}

export interface Point {
  id: string;
  playerId: string;
  name: PointName;
  value: number;
  pristine: boolean;
  strike: boolean;
}

export interface GameState {
  id: string;
  created: string;
  lastChanged: string;
  disableUndoButton: boolean;
  disableAddPlayerButton: boolean;
  players: Player[];
  previousStates: GameState[];
  completed: string;
}

export interface IGameStore {
  game: GameState;
}
