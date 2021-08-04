import {Player, Point, PointName} from '../model';
import {generate} from 'shortid';

export class GameUtils {

    public static possiblePoints = (name: PointName): number[] =>  ({
        [PointName.ONE]:            [1, 2, 3, 4, 5],
        [PointName.TWO]:            [2, 4, 6, 8, 10],
        [PointName.THREE]:          [3, 6, 9, 12, 15],
        [PointName.FOUR]:           [4, 8, 12, 16, 20],
        [PointName.FIVE]:           [5, 10, 15, 20, 25],
        [PointName.SIX]:            [6, 12, 18, 24, 30],
        [PointName.PAIR]:           [2, 4, 6, 8, 10, 12],
        [PointName.TWO_PAIR]:       [6, 8, 10, 12, 14, 16, 18, 20, 22],
        [PointName.TRIPS]:          [3, 6, 9, 12, 15, 18],
        [PointName.FOUR_OF_A_KIND]: [4, 8, 12, 16, 20, 24],
        [PointName.FULL_HOUSE]:     [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28],
        [PointName.SMALL_STRAIGHT]: [15],
        [PointName.LARGE_STRAIGHT]: [20],
        [PointName.CHANCE]:         [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [PointName.YATZY]:          [50],
        [PointName.TOTAL]:          [],
        [PointName.TOTAL_TOP]:      [],
        [PointName.BONUS]:          [50],
      }[name])


  public static setPoint = (player: Player, point: Point): Player => ({
      [PointName.ONE]:            {...player, one: point },
      [PointName.TWO]:            {...player, two: point },
      [PointName.THREE]:          {...player, three: point },
      [PointName.FOUR]:           {...player, four: point },
      [PointName.FIVE]:           {...player, five: point },
      [PointName.SIX]:            {...player, six: point },
      [PointName.PAIR]:           {...player, pair: point },
      [PointName.TWO_PAIR]:       {...player, two_pair: point },
      [PointName.TRIPS]:          {...player, trips: point },
      [PointName.FOUR_OF_A_KIND]: {...player, four_of_a_kind: point },
      [PointName.FULL_HOUSE]:     {...player, full_house: point },
      [PointName.SMALL_STRAIGHT]: {...player, small_straight: point },
      [PointName.LARGE_STRAIGHT]: {...player, large_straight: point },
      [PointName.CHANCE]:         {...player, chance: point },
      [PointName.YATZY]:          {...player, yatzy: point },
      [PointName.TOTAL]:          {...player},
      [PointName.TOTAL_TOP]:      {...player},
      [PointName.BONUS]:          {...player},
    }[point.name])

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
}

