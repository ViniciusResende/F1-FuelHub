import { openf1 } from './openf1.service';
import { OpenF1Driver, DriverDTO } from '../types';
import { dedupeBy } from '../utils/array';

/**
 */
export async function listActiveDrivers(): Promise<DriverDTO[]> {
  const raw: OpenF1Driver[] = await openf1.get<OpenF1Driver[]>('/drivers', {
    session_key: 'latest',
  });

  /** Some drivers repeat per session—dedupe on driver_number. */
  const unique = dedupeBy(raw, (d) => d.driver_number);

  /** Map to DTO */
  return unique.map<DriverDTO>((d) => ({
    number: d.driver_number,
    name: d.full_name || d.driver_name,
    country: d.country_code,
    team: d.team_name,
    headshot: d.headshot_url,
  }));
}
