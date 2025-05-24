import { openf1 } from './openf1.service';
import { listActiveDrivers } from './drivers.service';
import { PodiumDriver } from '../types';

interface PodiumCount {
  first: number;
  second: number;
  third: number;
  total: number;
}

function countPodiums(rows: { position: number; date: string }[]): PodiumCount {
  const count = { first: 0, second: 0, third: 0 };
  rows.forEach((row) => {
    if (row.position === 1) count.first += 1;
    else if (row.position === 2) count.second += 1;
    else if (row.position === 3) count.third += 1;
  });
  return { ...count, total: count.first + count.second + count.third };
}

export async function topPoleDrivers(): Promise<Array<PodiumDriver>> {
  const uniqueDrivers = await listActiveDrivers();

  const podiumPromises = uniqueDrivers.map(async (d) => {
    const rows: { position: number; date: string }[] = await openf1.get(
      `/position?driver_number=${d.number}&position<=3`,
    );

    const currYear = new Date().getUTCFullYear();

    /* filter rows to the target season */
    const seasonRows = rows.filter(
      (r) => new Date(r.date).getUTCFullYear() === currYear,
    );

    //TODO: This could account only for actual grands prix

    const counts = countPodiums(seasonRows);

    return {
      number: d.number,
      name: d.name,
      country: d.country,
      team: d.team,
      headshot: d.headshot,
      ...counts,
    };
  });

  /** Pseudo parallel requests */
  const perDriver = await Promise.all(podiumPromises);

  const sortedByTotal = perDriver.sort((a, b) => b.total - a.total);
  const topDrivers = sortedByTotal.slice(0, 3);

  return topDrivers;
}
