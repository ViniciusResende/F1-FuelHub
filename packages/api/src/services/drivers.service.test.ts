import { OpenF1Driver } from '../types';
import { openf1 } from './openf1.service';
import { getDriverByNumber, listActiveDrivers } from './drivers.service';

// Mock the openf1 service
jest.mock('./openf1.service', () => ({
  openf1: {
    get: jest.fn(),
  },
}));

describe('Drivers Service', () => {
  const mockDriver: OpenF1Driver = {
    driver_number: 44,
    driver_name: 'HAM',
    full_name: 'Lewis Hamilton',
    country_code: 'GBR',
    headshot_url: 'https://example.com/hamilton.jpg',
    broadcast_name: 'Hamilton',
    team_name: 'Mercedes',
    first_name: 'Lewis',
    last_name: 'Hamilton',
  };

  const mockDriverNoFullName: OpenF1Driver = {
    ...mockDriver,
    full_name: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDriverByNumber', () => {
    it('should return driver data when found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockDriver]);

      const result = await getDriverByNumber(44);

      expect(openf1.get).toHaveBeenCalledWith('/drivers', {
        driver_number: 44,
        session_key: 'latest',
      });
      expect(result).toEqual({
        number: 44,
        name: 'Lewis Hamilton',
        country: 'GBR',
        team: 'Mercedes',
        headshot: 'https://example.com/hamilton.jpg',
      });
    });

    it('should use driver_name when full_name is empty', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockDriverNoFullName]);

      const result = await getDriverByNumber(44);

      expect(result?.name).toBe('HAM');
    });

    it('should return null when driver is not found', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await getDriverByNumber(999);

      expect(result).toBeNull();
    });
  });

  describe('listActiveDrivers', () => {
    it('should return list of active drivers', async () => {
      const mockDrivers = [mockDriver, { ...mockDriver, driver_number: 77 }];
      (openf1.get as jest.Mock).mockResolvedValueOnce(mockDrivers);

      const result = await listActiveDrivers();

      expect(openf1.get).toHaveBeenCalledWith('/drivers', {
        session_key: 'latest',
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        number: 44,
        name: 'Lewis Hamilton',
        country: 'GBR',
        team: 'Mercedes',
        headshot: 'https://example.com/hamilton.jpg',
      });
    });

    it('should dedupe drivers with same number', async () => {
      const mockDrivers = [
        mockDriver,
        mockDriver,
        { ...mockDriver, driver_number: 77 },
      ];
      (openf1.get as jest.Mock).mockResolvedValueOnce(mockDrivers);

      const result = await listActiveDrivers();

      expect(result).toHaveLength(2);
    });

    it('should handle empty response', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([]);

      const result = await listActiveDrivers();

      expect(result).toEqual([]);
    });

    it('should use driver_name when full_name is empty', async () => {
      (openf1.get as jest.Mock).mockResolvedValueOnce([mockDriverNoFullName]);

      const result = await listActiveDrivers();

      expect(result[0].name).toBe('HAM');
    });
  });
});
