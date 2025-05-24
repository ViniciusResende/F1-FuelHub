import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { PitstopDTO, RawPit } from '../types';

/**
 */
export async function fastestPitstops(): Promise<{
  currentYear: PitstopDTO | null;
  overall: PitstopDTO | null;
}> {
  const raw: RawPit[] = await openf1.get('/pit?pit_duration<25');

  if (!raw.length) return { currentYear: null, overall: null };

  const currYear = new Date().getUTCFullYear();

  const buildDto = async (row: RawPit): Promise<PitstopDTO | null> => {
    const driver = await getDriverByNumber(row.driver_number);
    if (!driver) return null;

    return {
      year: new Date(row.date).getUTCFullYear(),
      time: row.pit_duration,
      driver: driver.name,
      team: driver.team,
      number: driver.number,
    };
  };

  const findFastestPitstop = (min: RawPit, r: RawPit) =>
    r.pit_duration < min.pit_duration ? r : min;

  const fastestOverallRow = raw.reduce(findFastestPitstop);

  const sameSeason = raw.filter(
    (r) => new Date(r.date).getUTCFullYear() === currYear,
  );
  const fastestYearRow =
    sameSeason.length > 0 ? sameSeason.reduce(findFastestPitstop) : null;

  return {
    currentYear: fastestYearRow ? await buildDto(fastestYearRow) : null,
    overall: await buildDto(fastestOverallRow),
  };
}
