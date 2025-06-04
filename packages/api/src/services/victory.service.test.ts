import { SessionRaw, PositionRaw } from '../types';
import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { mostVictoriousDriver } from './victory.service';

// Mock both the openf1 service and the drivers service
jest.mock('./openf1.service', () => ({
  openf1: {
    get: jest.fn(),
  },
}));

jest.mock('./drivers.service', () => ({
  getDriverByNumber: jest.fn(),
}));

describe('Victory Service', () => {
  const mockDriver = {
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    number: 44,
    country: 'GBR',
    headshot: 'https://example.com/hamilton.jpg',
  };

  const mockSessions: SessionRaw[] = [
    {
      session_key: 8001,
      session_type: 'Race',
      date_start: '2023-07-09T14:00:00.000Z',
    },
    {
      session_key: 8002,
      session_type: 'Race',
      date_start: '2022-07-03T14:00:00.000Z',
    },
    {
      session_key: 8003,
      session_type: 'Race',
      date_start: '2021-07-18T14:00:00.000Z',
    },
  ];

  const createWinnerPosition = (driverNumber: number): PositionRaw => ({
    date: '2023-07-09T15:30:00.000Z',
    position: 1,
    driver_number: driverNumber,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('mostVictoriousDriver', () => {
    it('should return the driver with most victories in a country', async () => {
      // Mock sessions for Great Britain
      (openf1.get as jest.Mock).mockResolvedValueOnce(mockSessions);

      // Mock position data for each session - Hamilton wins 2, Verstappen wins 1
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce([createWinnerPosition(44)]) // Hamilton
        .mockResolvedValueOnce([createWinnerPosition(44)]) // Hamilton
        .mockResolvedValueOnce([createWinnerPosition(1)]); // Verstappen

      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await mostVictoriousDriver('Great Britain');

      expect(openf1.get).toHaveBeenNthCalledWith(1, '/sessions', {
        country_name: 'Great Britain',
        session_type: 'Race',
      });

      mockSessions.forEach((session, index) => {
        expect(openf1.get).toHaveBeenNthCalledWith(index + 2, '/position', {
          session_key: session.session_key,
          position: 1,
        });
      });

      expect(getDriverByNumber).toHaveBeenCalledWith(44);
      expect(result).toEqual({
        ...mockDriver,
        country: 'Great Britain',
        wins: 2,
      });
    });

    it('should handle case when no sessions are found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await mostVictoriousDriver('Unknown Country');

      expect(result).toBeNull();
      expect(openf1.get).toHaveBeenCalledTimes(1);
      expect(getDriverByNumber).not.toHaveBeenCalled();
    });

    it('should handle case when no winner is found for a session', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockSessions[0]]);
      (openf1.get as jest.Mock).mockResolvedValueOnce([]); // No winner found

      const result = await mostVictoriousDriver('Monaco');

      expect(result).toBeNull();
    });

    it('should handle case when driver is not found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockSessions[0]]);
      (openf1.get as jest.Mock).mockResolvedValueOnce([
        createWinnerPosition(44),
      ]);
      (getDriverByNumber as jest.Mock).mockResolvedValue(null);

      const result = await mostVictoriousDriver('Monaco');

      expect(result).toBeNull();
    });

    it('should correctly find driver with most wins when tied', async () => {
      // Mock sessions
      (openf1.get as jest.Mock).mockResolvedValueOnce([
        mockSessions[0],
        mockSessions[1],
      ]);

      // Mock two drivers with same number of wins
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce([createWinnerPosition(44)]) // Hamilton
        .mockResolvedValueOnce([createWinnerPosition(1)]); // Verstappen

      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await mostVictoriousDriver('Monaco');

      // Should return the first driver found with max wins
      expect(result).toEqual({
        ...mockDriver,
        country: 'Monaco',
        wins: 1,
      });
    });

    it('should handle multiple sessions with same winner', async () => {
      // Mock three sessions
      (openf1.get as jest.Mock).mockResolvedValueOnce(mockSessions);

      // Mock same winner for all sessions
      (openf1.get as jest.Mock)
        .mockResolvedValueOnce([createWinnerPosition(44)])
        .mockResolvedValueOnce([createWinnerPosition(44)])
        .mockResolvedValueOnce([createWinnerPosition(44)]);

      (getDriverByNumber as jest.Mock).mockResolvedValue(mockDriver);

      const result = await mostVictoriousDriver('Silverstone');

      expect(result?.wins).toBe(3);
    });
  });
});
