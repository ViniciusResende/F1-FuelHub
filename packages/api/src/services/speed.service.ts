import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { TopSpeedDTO, SessionRaw, LapRaw } from '../types';

export async function topSpeedLatestRace(): Promise<TopSpeedDTO | null> {
  const currYear = new Date().getUTCFullYear();
  const sessions: SessionRaw[] = await openf1.get('/sessions', {
    year: currYear,
    session_type: 'Race',
  });

  const latestRace = sessions.sort(
    (a, b) =>
      new Date(b.date_start).getTime() - new Date(a.date_start).getTime(),
  )[0];

  if (!latestRace) return null;

  const laps: LapRaw[] = await openf1.get('/laps', {
    session_key: latestRace.session_key,
  });

  const fastest = laps
    .filter((l) => l.st_speed !== null)
    .reduce((max, l) => (l.st_speed! > max.st_speed! ? l : max), laps[0]);

  if (!fastest || fastest.st_speed === null) return null;

  const driver = await getDriverByNumber(fastest.driver_number);
  if (!driver) return null;

  return {
    year: currYear,
    sessionKey: latestRace.session_key,
    speed: +fastest.st_speed.toFixed(1),
    driver: driver.name,
    team: driver.team,
    number: driver.number,
  };
}
