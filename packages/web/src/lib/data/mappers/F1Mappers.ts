import { F1Pilot, F1Team } from '../enums/F1Enums';

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

const ApiTeamNameToTeamEnumMap = new Map<string, F1Team>([
  ['Alpine', F1Team.Alpine],
  ['Aston Martin', F1Team.AstonMartin],
  ['Ferrari', F1Team.Ferrari],
  ['Haas F1 Team', F1Team.Haas],
  ['Kick Sauber', F1Team.KickSauber],
  ['McLaren', F1Team.McLaren],
  ['Mercedes', F1Team.Mercedes],
  ['Racing Bulls', F1Team.RacingBulls],
  ['Red Bull Racing', F1Team.RedBull],
  ['Williams', F1Team.Williams],
]);

const ApiDriverNameToDriverEnumMap = new Map<string, F1Pilot>([
  /** Alpine */
  ['Franco COLAPINTO', F1Pilot.Colapinto],
  ['Pierre GASLY', F1Pilot.Gasly],
  /** Aston Martin */
  ['Fernando ALONSO', F1Pilot.Alonso],
  ['Lance STROLL', F1Pilot.Stroll],
  /** Ferrari */
  ['Lewis HAMILTON', F1Pilot.Hamilton],
  ['Charles LECLERC', F1Pilot.Leclerc],
  /** Haas */
  ['Nick BEARMAN', F1Pilot.Bearman],
  ['Esteban OCON', F1Pilot.Ocon],
  /** Kick Sauber */
  ['Gabriel BORTOLETO', F1Pilot.Bortoleto],
  ['Nico HULKENBERG', F1Pilot.Hulkenberg],
  /** McLaren */
  ['Lando NORRIS', F1Pilot.Norris],
  ['Oscar PIASTRI', F1Pilot.Piastri],
  /** Mercedes */
  ['Kimi ANTONELLI', F1Pilot.Antonelli],
  ['George RUSSELL', F1Pilot.Russell],
  /** Racing Bulls */
  ['Isack HADJAR', F1Pilot.Hadjar],
  ['Liam LAWSON', F1Pilot.Lawson],
  /** Red Bull */
  ['Yuki TSUNODA', F1Pilot.Tsunoda],
  ['Max VERSTAPPEN', F1Pilot.Verstappen],
  /** Williams */
  ['Alexander ALBON', F1Pilot.Albon],
  ['Carlos SAINZ', F1Pilot.Sainz],
]);

export {
  ApiDriverNameToDriverEnumMap,
  ApiTeamNameToTeamEnumMap,
  TeamEnumToTeamNameMap,
};
