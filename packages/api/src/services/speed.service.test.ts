import { SessionRaw, LapRaw } from '../types';
import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { topSpeedLatestRace } from './speed.service';

// Mock both the openf1 service and the drivers service
jest.mock('./openf1.service', () => ({
  openf1: {
    get: jest.fn(),
  },
}));

jest.mock('./drivers.service', () => ({
  getDriverByNumber: jest.fn(),
}));

describe('Speed Service', () => {
  const currentYear = new Date().getUTCFullYear();

  const mockDriver = {
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    number: 1,
    country: 'NLD',
    headshot: 'https://example.com/max.jpg',
  };

  const mockSessions: SessionRaw[] = [
    {
      session_key: 9001,
      session_type: 'Race',
      date_start: `${currentYear}-03-05T14:00:00.000Z`,
    },
    {
      session_key: 9002,
      session_type: 'Race',
      date_start: `${currentYear}-03-19T15:00:00.000Z`, // Latest race
    },
    {
      session_key: 9003,
      session_type: 'Practice',
      date_start: `${currentYear}-03-20T10:00:00.000Z`,
    },
  ];

  const mockLaps: LapRaw[] = [
    {
      driver_number: 1,
      st_speed: 340.5,
    },
    {
      driver_number: 44,
      st_speed: 338.2,
    },
    {
      driver_number: 16,
      st_speed: 339.8,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('topSpeedLatestRace', () => {
    it('should return top speed data from latest race', async () => {
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(mockLaps);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await topSpeedLatestRace();

      expect(openf1.get).toHaveBeenNthCalledWith(1, '/sessions', {
        year: currentYear,
        session_type: 'Race',
      });
      expect(openf1.get).toHaveBeenNthCalledWith(2, '/laps', {
        session_key: 9003, // Latest race session key
      });
      expect(getDriverByNumber).toHaveBeenCalledWith(1);

      expect(result).toEqual({
        year: currentYear,
        sessionKey: 9003,
        speed: 340.5,
        driver: mockDriver.name,
        team: mockDriver.team,
        number: mockDriver.number,
      });
    });

    it('should handle case when no sessions are found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await topSpeedLatestRace();

      expect(result).toBeNull();
      expect(openf1.get).toHaveBeenCalledTimes(1);
      expect(getDriverByNumber).not.toHaveBeenCalled();
    });

    it('should handle case when no laps data is found', async () => {
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce([]);

      const result = await topSpeedLatestRace();

      expect(result).toBeNull();
    });

    it('should handle case when lap speeds are null', async () => {
      const nullSpeedLaps: LapRaw[] = [
        {
          driver_number: 1,
          st_speed: null,
        },
      ];

      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(nullSpeedLaps);

      const result = await topSpeedLatestRace();

      expect(result).toBeNull();
    });

    it('should handle case when driver is not found', async () => {
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(mockLaps);
      (getDriverByNumber as jest.Mock).mockResolvedValue(null);

      const result = await topSpeedLatestRace();

      expect(result).toBeNull();
    });

    it('should correctly find highest speed among multiple laps', async () => {
      const mixedSpeedLaps: LapRaw[] = [
        {
          driver_number: 1,
          st_speed: 338.2,
        },
        {
          driver_number: 1,
          st_speed: 342.5, // Highest speed
        },
        {
          driver_number: 1,
          st_speed: 340.1,
        },
      ];

      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(mixedSpeedLaps);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await topSpeedLatestRace();

      expect(result?.speed).toBe(342.5);
    });

    it('should filter out null speeds when finding highest', async () => {
      const mixedSpeedLaps: LapRaw[] = [
        {
          driver_number: 1,
          st_speed: null,
        },
        {
          driver_number: 1,
          st_speed: 342.5,
        },
        {
          driver_number: 1,
          st_speed: null,
        },
      ];

      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(mixedSpeedLaps);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await topSpeedLatestRace();

      expect(result?.speed).toBe(342.5);
    });

    it('should round speed to one decimal place', async () => {
      const preciseSpeedLap: LapRaw[] = [
        {
          driver_number: 1,
          st_speed: 342.567,
        },
      ];

      (openf1.get as jest.Mock)
        .mockResolvedValueOnce(mockSessions)
        .mockResolvedValueOnce(preciseSpeedLap);
      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await topSpeedLatestRace();

      expect(result?.speed).toBe(342.6);
    });
  });
});
