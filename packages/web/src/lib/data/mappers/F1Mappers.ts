import { F1Team } from '../enums/F1Enums';

const TeamEnumToTeamNameMap = new Map<F1Team, string>([
  [F1Team.Alpine, 'BWT Alpine Formula One Team'],
  [F1Team.AstonMartin, 'Aston Martin Aramco Formula One Team'],
  [F1Team.Ferrari, 'Scuderia Ferrari HP'],
  [F1Team.Haas, 'MoneyGram Haas F1 Team'],
  [F1Team.KickSauber, 'Stake F1 Team Kick Sauber'],
  [F1Team.McLaren, 'McLaren Formula 1 Team'],
  [F1Team.Mercedes, 'Mercedes-AMG PETRONAS Formula One Team'],
  [F1Team.RacingBulls, 'Visa Cash App Racing Bulls Formula One Team'],
  [F1Team.RedBull, 'Oracle Red Bull Racing'],
  [F1Team.Williams, 'Atlassian Williams Racing'],
]);

export { TeamEnumToTeamNameMap };
