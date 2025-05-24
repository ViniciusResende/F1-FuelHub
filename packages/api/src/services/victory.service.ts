import { openf1 } from './openf1.service';
import { getDriverByNumber } from './drivers.service';
import { SessionRaw, PositionRaw, VictoryDTO } from '../types';

export async function mostVictoriousDriver(
  country: string,
): Promise<VictoryDTO | null> {
  const raceSessions: SessionRaw[] = await openf1.get('/sessions', {
    country_name: country,
    session_type: 'Race',
  });

  if (!raceSessions.length) return null;

  const winCount = new Map<number, number>();

  await Promise.all(
    raceSessions.map(async (s) => {
      const winners: PositionRaw[] = await openf1.get('/position', {
        session_key: s.session_key,
        position: 1,
      });

      const winner = winners[0];
      if (!winner) return;

      winCount.set(
        winner.driver_number,
        (winCount.get(winner.driver_number) ?? 0) + 1,
      );
    }),
  );

  if (winCount.size === 0) return null;

  const [topDriverNumber, wins] = Array.from(winCount.entries()).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
  );

  const driver = await getDriverByNumber(topDriverNumber);
  if (!driver) return null;

  return {
    ...driver,
    country,
    wins,
  };
}
