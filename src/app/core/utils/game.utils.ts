import {Player, Point, PointName} from '../model';
import {generate} from 'shortid';

export class GameUtils {

  public static possiblePoints(name: PointName): number[] {
    switch (name) {
      case PointName.ONE:
        return [1, 2, 3, 4, 5, 6];
      case PointName.TWO:
        return [2, 4, 6, 8, 10];
      case PointName.THREE:
        return [3, 6, 9, 12, 15];
      case PointName.FOUR:
        return [4, 8, 12, 16, 20];
      case PointName.FIVE:
        return [5, 10, 15, 20, 25];
      case PointName.SIX:
        return [6, 12, 18, 24, 30];
      case PointName.PAIR:
        return [2, 4, 6, 8, 10, 12];
      case PointName.TWO_PAIR:
        return [6, 8, 10, 12, 14, 16, 18, 20, 22];
      case PointName.TRIPS:
        return [3, 6, 9, 12, 15, 18];
      case PointName.FOUR_OF_A_KIND:
        return [4, 8, 12, 16, 20, 24];
      case PointName.FULL_HOUSE:
        return [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28];
      case PointName.SMALL_STRAIGHT:
        return [15];
      case PointName.LARGE_STRAIGHT:
        return [20];
      case PointName.CHANCE:
        return [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      case PointName.YATZY:
        return [50];
      default:
        return [];
    }
  }

  public static setPoint(player: Player, point: Point): Player {
    switch (point.name) {
      case PointName.ONE:
        return {...player, one: point };
      case PointName.TWO:
        return {...player, two: point };
      case PointName.THREE:
        return {...player, three: point };
      case PointName.FOUR:
        return {...player, four: point };
      case PointName.FIVE:
        return {...player, five: point };
      case PointName.SIX:
        return {...player, six: point };
      case PointName.PAIR:
        return {...player, pair: point };
      case PointName.TWO_PAIR:
        return {...player, two_pair: point };
      case PointName.TRIPS:
        return {...player, trips: point };
      case PointName.FOUR_OF_A_KIND:
        return {...player, four_of_a_kind: point };
      case PointName.FULL_HOUSE:
        return {...player, full_house: point };
      case PointName.SMALL_STRAIGHT:
        return {...player, small_straight: point };
      case PointName.LARGE_STRAIGHT:
        return {...player, large_straight: point };
      case PointName.CHANCE:
        return {...player, chance: point };
      case PointName.YATZY:
        return {...player, yatzy: point };
      default:
        return {...player};
    }
  }

  public static sumPoints(player: Player): Player {
    player.total_top = this.createPoint({
      playerId: player.id,
      value: this.getTopTotalValue(player),
      name: PointName.TOTAL_TOP,
    });
    if (!player.bonus && player.total_top?.value > 62) {
      player.bonus = this.createPoint({
        playerId: player.id,
        value: 50,
        name: PointName.BONUS,
      });
    }
    player.total = this.createPoint({
      playerId: player.id,
      name: PointName.TOTAL,
      value: this.getTotalValue(player)
    });

    player.completed = this.playerCompleted(player);

    return player;
  }

  public static allPlayersCompleted(players: Player[]): boolean {
    return players
      .reduce((completed: boolean, player: Player) => player.completed, false);
  }

  public static playerCompleted(player: Player): boolean {
    const playerPoints = this.getPlayerPointsAsArray(player);
    if (playerPoints.length < 17) {
      return false;
    }
    return playerPoints
      .reduce((completed: boolean, point: Point) => !point.pristine, false);
  }

  public static getPlayerPointsAsArray(player: Player): Point[] {
    return Object.keys(player).reduce((points: Point[], key: string) => {
      const pointName = key as PointName;
      if (key !== 'name' && key !== 'id' && !!player[pointName]) {
        points.push(player[pointName] as Point);
      }
      return points;
    }, []);
  }

  public static createPoint({playerId, name, value, strike}: {playerId: string, name: PointName, value: number, strike?: boolean}): Point {
    return {
      id: generate(),
      playerId,
      value,
      name,
      strike: strike ? strike : false,
      pristine: false
    };
  }

  private static getTotalValue(player: Player): number {
    return (player?.total_top?.value || 0) +
      (player.bonus?.value || 0) +
      (player.pair?.value || 0) +
      (player.two_pair?.value || 0) +
      (player.trips?.value || 0) +
      (player.four_of_a_kind?.value || 0) +
      (player.full_house?.value || 0) +
      (player.small_straight?.value || 0) +
      (player.large_straight?.value || 0) +
      (player.chance?.value || 0) +
      (player.yatzy?.value || 0);
  }

  private static getTopTotalValue(player: Player): number {
    return (player?.one?.value || 0) +
      (player?.two?.value || 0) +
      (player?.three?.value || 0) +
      (player?.four?.value || 0) +
      (player?.five?.value || 0) +
      (player?.six?.value || 0);
  }

  public static getPointNameLabel(pointName: PointName): string {
    switch (pointName) {
      case PointName.ONE: return 'Ettor';
      case PointName.TWO: return 'Tvåor';
      case PointName.THREE: return 'Treor';
      case PointName.FOUR: return 'Fyror';
      case PointName.FIVE: return 'Femmor';
      case PointName.SIX: return 'Sexor';
      case PointName.PAIR: return 'Ett Par';
      case PointName.TWO_PAIR: return 'Två Par';
      case PointName.TRIPS: return 'Tretal';
      case PointName.FOUR_OF_A_KIND: return 'Fyrtal';
      case PointName.FULL_HOUSE: return 'Kåk';
      case PointName.SMALL_STRAIGHT: return 'Liten Stege';
      case PointName.LARGE_STRAIGHT: return 'Stor Stege';
      case PointName.CHANCE: return 'Chans';
      case PointName.YATZY: return 'Yatzy';
      default:
        return '';
    }
  }
}

