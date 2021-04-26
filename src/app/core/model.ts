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
  FULL_HOUSE = 'fullhouse',
  SMALL_STRAIGHT = 'small_straight',
  LARGE_STRAIGHT = 'large_straight',
  CHANCE = 'chance',
  YATZY = 'yatzy'
}

export interface Player {
  name: string;
  id: string;
  total_top?: Point;
  total?: Point;
  one?: Point;
  two?: Point;
  three?: Point;
  four?: Point;
  five?: Point;
  six?: Point;
  bonus?: Point;
  pair?: Point;
  two_pair?: Point;
  trips?: Point;
  four_of_a_kind?: Point;
  full_house?: Point;
  small_straight?: Point;
  large_straight?: Point;
  chance?: Point;
  yatzy?: Point;
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
  disableUndoButton: boolean;
  disableAddPlayerButton: boolean;
  players: Player[];
  previousStates: GameState[];
}

export interface IGameStore {
  game: GameState;
}
