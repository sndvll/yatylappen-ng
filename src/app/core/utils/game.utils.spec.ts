import { GameUtils } from './game.utils';
import { Player, PointName, Point } from '../model';

describe('GameUtils', () => {
  let idCounter = 0;
  const uid = () => `id_${++idCounter}`;

  const createMockPlayer = (overrides: Partial<Player> = {}): Player => ({
    name: 'TestPlayer',
    id: uid(),
    completed: false,
    ...overrides,
  });

  describe('possiblePoints', () => {
    it('ger rätt poäng för ettor', () => {
      expect(GameUtils.possiblePoints(PointName.ONE)).toEqual([1, 2, 3, 4, 5]);
    });

    it('ger rätt poäng för sexor', () => {
      expect(GameUtils.possiblePoints(PointName.SIX)).toEqual([6, 12, 18, 24, 30]);
    });

    it('ger rätt poäng för yatzy', () => {
      expect(GameUtils.possiblePoints(PointName.YATZY)).toEqual([50]);
    });

    it('ger rätt poäng för small straight', () => {
      expect(GameUtils.possiblePoints(PointName.SMALL_STRAIGHT)).toEqual([15]);
    });

    it('ger rätt poäng för large straight', () => {
      expect(GameUtils.possiblePoints(PointName.LARGE_STRAIGHT)).toEqual([20]);
    });

    it('ger tom array för total', () => {
      expect(GameUtils.possiblePoints(PointName.TOTAL)).toEqual([]);
    });

    it('ger tom array för total_top', () => {
      expect(GameUtils.possiblePoints(PointName.TOTAL_TOP)).toEqual([]);
    });
  });

  describe('createPoint', () => {
    it('skapar en poäng med genererat id', () => {
      const point = GameUtils.createPoint({ playerId: 'p1', name: PointName.ONE, value: 5 });
      expect(point.id).toBeDefined();
      expect(point.playerId).toBe('p1');
      expect(point.name).toBe(PointName.ONE);
      expect(point.value).toBe(5);
      expect(point.strike).toBe(false);
      expect(point.pristine).toBe(false);
    });

    it('sätter strike om angivet', () => {
      const point = GameUtils.createPoint({ playerId: 'p1', name: PointName.ONE, value: 0, strike: true });
      expect(point.strike).toBe(true);
    });
  });

  describe('setPoint', () => {
    it('sätter poäng på rätt nyckel', () => {
      const player = createMockPlayer();
      const point: Point = {
        id: 'pt1', playerId: player.id, name: PointName.ONE,
        value: 5, pristine: false, strike: false,
      };
      const updated = GameUtils.setPoint(player, point);
      expect((updated as any).one).toEqual(point);
    });

    it('sätter six-poäng', () => {
      const player = createMockPlayer();
      const point: Point = {
        id: 'pt2', playerId: player.id, name: PointName.SIX,
        value: 18, pristine: false, strike: false,
      };
      const updated = GameUtils.setPoint(player, point);
      expect((updated as any).six).toEqual(point);
    });

    it('returnerar oförändrad spelare för total', () => {
      const player = createMockPlayer();
      const point: Point = {
        id: 'pt3', playerId: player.id, name: PointName.TOTAL,
        value: 100, pristine: false, strike: false,
      };
      const updated = GameUtils.setPoint(player, point);
      expect(updated).toEqual(player);
    });
  });

  describe('getPlayerPointsAsArray', () => {
    it('returnerar alla poäng som array', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 3, pristine: false, strike: false },
        pair: { id: 'p2', playerId: 'x', name: PointName.PAIR, value: 8, pristine: false, strike: false },
      });
      const points = GameUtils.getPlayerPointsAsArray(player);
      expect(points.length).toBe(2);
    });

    it('exkluderar metadatafält (name, id)', () => {
      const player = createMockPlayer();
      const points = GameUtils.getPlayerPointsAsArray(player);
      expect(points.length).toBe(0);
    });
  });

  describe('sumPoints', () => {
    it('beräknar total_top korrekt', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 3, pristine: false, strike: false },
        two: { id: 'p2', playerId: 'x', name: PointName.TWO, value: 6, pristine: false, strike: false },
        three: { id: 'p3', playerId: 'x', name: PointName.THREE, value: 9, pristine: false, strike: false },
        four: { id: 'p4', playerId: 'x', name: PointName.FOUR, value: 12, pristine: false, strike: false },
        five: { id: 'p5', playerId: 'x', name: PointName.FIVE, value: 15, pristine: false, strike: false },
        six: { id: 'p6', playerId: 'x', name: PointName.SIX, value: 18, pristine: false, strike: false },
      });
      const result = GameUtils.sumPoints(player);
      expect(result.total_top?.value).toBe(63);
    });

    it('ger bonus när total_top > 62', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 3, pristine: false, strike: false },
        two: { id: 'p2', playerId: 'x', name: PointName.TWO, value: 6, pristine: false, strike: false },
        three: { id: 'p3', playerId: 'x', name: PointName.THREE, value: 9, pristine: false, strike: false },
        four: { id: 'p4', playerId: 'x', name: PointName.FOUR, value: 12, pristine: false, strike: false },
        five: { id: 'p5', playerId: 'x', name: PointName.FIVE, value: 15, pristine: false, strike: false },
        six: { id: 'p6', playerId: 'x', name: PointName.SIX, value: 18, pristine: false, strike: false },
      });
      const result = GameUtils.sumPoints(player);
      expect(result.bonus?.value).toBe(50);
    });

    it('ger ingen bonus när total_top <= 62', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 1, pristine: false, strike: false },
        two: { id: 'p2', playerId: 'x', name: PointName.TWO, value: 2, pristine: false, strike: false },
      });
      const result = GameUtils.sumPoints(player);
      expect(result.bonus).toBeUndefined();
    });

    it('beräknar totalsumma med bonus och alla kategorier', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 3, pristine: false, strike: false },
        six: { id: 'p6', playerId: 'x', name: PointName.SIX, value: 18, pristine: false, strike: false },
        pair: { id: 'p7', playerId: 'x', name: PointName.PAIR, value: 10, pristine: false, strike: false },
        yatzy: { id: 'p8', playerId: 'x', name: PointName.YATZY, value: 50, pristine: false, strike: false },
      });
      const result = GameUtils.sumPoints(player);
      // total_top = 3+18 = 21 (no bonus since <=62)
      // total = 21 + 10 + 50 = 81
      expect(result.total?.value).toBe(81);
    });
  });

  describe('playerCompleted', () => {
    it('returnerar false om spelaren inte har alla 17 poäng', () => {
      const player = createMockPlayer({
        one: { id: 'p1', playerId: 'x', name: PointName.ONE, value: 3, pristine: false, strike: false },
      });
      expect(GameUtils.playerCompleted(player)).toBe(false);
    });

    it('returnerar true om alla poäng är satta', () => {
      // Alla 18 PointName-värden inklusive TOTAL och TOTAL_TOP
      const points: any = {};
      Object.values(PointName).forEach(name => {
        points[name] = { id: uid(), playerId: 'x', name, value: 5, pristine: false, strike: false };
      });
      const player = createMockPlayer(points);
      expect(GameUtils.playerCompleted(player)).toBe(true);
    });
  });

  describe('allPlayersCompleted', () => {
    it('returnerar true när alla spelare är klara', () => {
      const players = [
        createMockPlayer({ completed: true }),
        createMockPlayer({ completed: true }),
      ];
      expect(GameUtils.allPlayersCompleted(players)).toBe(true);
    });

    it('returnerar false om någon spelare inte är klar', () => {
      const players = [
        createMockPlayer({ completed: true }),
        createMockPlayer({ completed: false }),
      ];
      expect(GameUtils.allPlayersCompleted(players)).toBe(false);
    });
  });
});
