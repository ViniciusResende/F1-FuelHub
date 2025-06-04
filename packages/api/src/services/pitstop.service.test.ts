import { RawPit } from '../types';
import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { fastestPitstops } from './pitstop.service';

// Mock both the openf1 service and the drivers service
jest.mock('./openf1.service', () => ({
  openf1: {
    get: jest.fn(),
  },
}));

jest.mock('./drivers.service', () => ({
  getDriverByNumber: jest.fn(),
}));

describe('Pitstop Service', () => {
  const mockDriver = {
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    number: 44,
    country: 'GBR',
    headshot: 'https://example.com/hamilton.jpg',
  };

  const currentYear = new Date().getUTCFullYear();

  const mockPitstops: RawPit[] = [
    {
      date: `${currentYear}-03-05T14:30:00.000Z`,
      pit_duration: 2.4,
      driver_number: 44,
    },
    {
      date: '2023-07-02T15:45:00.000Z',
      pit_duration: 1.9,
      driver_number: 1,
    },
    {
      date: `${currentYear}-04-15T13:20:00.000Z`,
      pit_duration: 2.1,
      driver_number: 44,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fastestPitstops', () => {
    it('should return fastest pitstops for current year and overall', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce(mockPitstops);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await fastestPitstops();

      expect(openf1.get).toHaveBeenCalledWith('/pit?pit_duration<25');
      expect(getDriverByNumber).toHaveBeenCalledWith(1); // For overall fastest
      expect(getDriverByNumber).toHaveBeenCalledWith(44); // For current year fastest

      expect(result).toEqual({
        currentYear: {
          year: currentYear,
          time: 2.1,
          driver: mockDriver.name,
          team: mockDriver.team,
          number: mockDriver.number,
        },
        overall: {
          year: 2023,
          time: 1.9,
          driver: mockDriver.name,
          team: mockDriver.team,
          number: mockDriver.number,
        },
      });
    });

    it('should handle empty response from API', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await fastestPitstops();

      expect(result).toEqual({
        currentYear: null,
        overall: null,
      });
      expect(getDriverByNumber).not.toHaveBeenCalled();
    });

    it('should handle case when no current year pitstops exist', async () => {
      const oldPitstops: RawPit[] = [
        {
          date: '2023-07-02T15:45:00.000Z',
          pit_duration: 1.9,
          driver_number: 1,
        },
      ];

      (openf1.get as jest.Mock).mockResolvedValueOnce(oldPitstops);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await fastestPitstops();

      expect(result).toEqual({
        currentYear: null,
        overall: {
          year: 2023,
          time: 1.9,
          driver: mockDriver.name,
          team: mockDriver.team,
          number: mockDriver.number,
        },
      });
    });

    it('should handle case when driver is not found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockPitstops[1]]); // Using only the overall fastest
      (getDriverByNumber as jest.Mock).mockResolvedValue(null);

      const result = await fastestPitstops();

      expect(result).toEqual({
        currentYear: null,
        overall: null,
      });
    });

    it('should find fastest pitstop when multiple exist', async () => {
      const multiplePitstops: RawPit[] = [
        {
          date: `${currentYear}-03-05T14:30:00.000Z`,
          pit_duration: 2.4,
          driver_number: 44,
        },
        {
          date: `${currentYear}-04-15T13:20:00.000Z`,
          pit_duration: 2.1,
          driver_number: 44,
        },
        {
          date: `${currentYear}-05-01T16:00:00.000Z`,
          pit_duration: 2.3,
          driver_number: 44,
        },
      ];

      (openf1.get as jest.Mock).mockResolvedValueOnce(multiplePitstops);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await fastestPitstops();

      expect(result.currentYear).toEqual({
        year: currentYear,
        time: 2.1,
        driver: mockDriver.name,
        team: mockDriver.team,
        number: mockDriver.number,
      });
    });
  });
});
