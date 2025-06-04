import { PositionRaw } from '../types';
import { openf1 } from './openf1.service';
import { listActiveDrivers } from './drivers.service';
import { topPoleDrivers } from './pole.service';

// Mock both the openf1 service and the drivers service
jest.mock('./openf1.service', () => ({
  openf1: {
    get: jest.fn(),
  },
}));

jest.mock('./drivers.service', () => ({
  listActiveDrivers: jest.fn(),
}));

describe('Pole Service', () => {
  const currentYear = new Date().getUTCFullYear();

  const mockDrivers = [
    {
      number: 1,
      name: 'Max Verstappen',
      country: 'NLD',
      team: 'Red Bull Racing',
      headshot: 'https://example.com/max.jpg',
    },
    {
      number: 44,
      name: 'Lewis Hamilton',
      country: 'GBR',
      team: 'Mercedes',
      headshot: 'https://example.com/lewis.jpg',
    },
    {
      number: 16,
      name: 'Charles Leclerc',
      country: 'MCO',
      team: 'Ferrari',
      headshot: 'https://example.com/charles.jpg',
    },
  ];

  const createPositionRows = (
    driverNumber: number,
    positions: number[],
  ): PositionRaw[] => {
    return positions.map((pos, index) => ({
      date: `${currentYear}-0${index + 1}-01T14:00:00.000Z`,
      position: pos,
      driver_number: driverNumber,
    }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (listActiveDrivers as jest.Mock).mockResolvedValue(mockDrivers);
  });

  describe('topPoleDrivers', () => {
    it('should return top 3 drivers sorted by total podiums', async () => {
      // Mock position data for each driver
      const verstappenPositions = createPositionRows(1, [1, 1, 2, 1]); // 3 wins, 1 second
      const hamiltonPositions = createPositionRows(44, [2, 2, 1, 3]); // 1 win, 2 seconds, 1 third
      const leclercPositions = createPositionRows(16, [3, 3, 3, 2]); // 3 thirds, 1 second

      // Setup mock responses for each driver
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(verstappenPositions)
        .mockResolvedValueOnce(hamiltonPositions)
        .mockResolvedValueOnce(leclercPositions);

      const result = await topPoleDrivers();

      expect(result).toHaveLength(3);
      // Verstappen should be first (4 podiums total)
      expect(result[0]).toEqual({
        ...mockDrivers[0],
        first: 3,
        second: 1,
        third: 0,
        total: 4,
      });
      // Hamilton second (4 podiums total)
      expect(result[1]).toEqual({
        ...mockDrivers[1],
        first: 1,
        second: 2,
        third: 1,
        total: 4,
      });
      // Leclerc third (4 podiums total)
      expect(result[2]).toEqual({
        ...mockDrivers[2],
        first: 0,
        second: 1,
        third: 3,
        total: 4,
      });
    });

    it('should handle empty position data for drivers', async () => {
      // Mock empty position data for all drivers
      (openf1.get as jest.Mock).mockResolvedValue([]);

      const result = await topPoleDrivers();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        ...mockDrivers[0],
        first: 0,
        second: 0,
        third: 0,
        total: 0,
      });
    });

    it('should filter out positions from previous years', async () => {
      const mixedYearPositions: PositionRaw[] = [
        {
          date: `${currentYear}-01-01T14:00:00.000Z`,
          position: 1,
          driver_number: 1,
        },
        {
          date: '2023-12-31T14:00:00.000Z', // Previous year
          position: 1,
          driver_number: 1,
        },
      ];

      (openf1.get as jest.Mock).mockResolvedValue(mixedYearPositions);

      const result = await topPoleDrivers();

      expect(result[0]).toEqual({
        ...mockDrivers[0],
        first: 1, // Only counting the current year position
        second: 0,
        third: 0,
        total: 1,
      });
    });

    it('should handle case when no drivers have podiums', async () => {
      // Mock position data with no podium positions
      const noPodiusPositions: PositionRaw[] = [
        {
          date: `${currentYear}-01-01T14:00:00.000Z`,
          position: 4,
          driver_number: 1,
        },
      ];

      (openf1.get as jest.Mock).mockResolvedValue(noPodiusPositions);

      const result = await topPoleDrivers();

      expect(result).toHaveLength(3);
      expect(result.every((driver) => driver.total === 0)).toBe(true);
    });

    it('should correctly count different podium positions', async () => {
      const mixedPositions = createPositionRows(1, [1, 2, 3, 1, 2, 3]);
      (openf1.get as jest.Mock).mockResolvedValue(mixedPositions);

      const result = await topPoleDrivers();

      expect(result[0]).toEqual({
        ...mockDrivers[0],
        first: 2,
        second: 2,
        third: 2,
        total: 6,
      });
    });
  });
});
