import { F1Pilot, F1Team, F1Country } from '../enums/F1Enums';

const TeamEnumToTeamNameMap = new Map<F1Team, string>([
  [F1Team.Alpine, 'Alpine F1 Team'],
  [F1Team.AstonMartin, 'Aston Martin F1 Team'],
  [F1Team.Ferrari, 'Scuderia Ferrari'],
  [F1Team.Haas, 'Haas F1 Team'],
  [F1Team.KickSauber, 'Kick Sauber F1 Team'],
  [F1Team.McLaren, 'McLaren F1 Team'],
  [F1Team.Mercedes, 'Mercedes F1 Team'],
  [F1Team.RacingBulls, 'Racing Bulls F1 Team'],
  [F1Team.RedBull, 'Red Bull Racing'],
  [F1Team.Williams, 'Williams Racing'],
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

const TeamEnumToApiTeamNameMap = new Map<F1Team, string>([
  [F1Team.Alpine, 'Alpine'],
  [F1Team.AstonMartin, 'Aston Martin'],
  [F1Team.Ferrari, 'Ferrari'],
  [F1Team.Haas, 'Haas F1 Team'],
  [F1Team.KickSauber, 'Kick Sauber'],
  [F1Team.McLaren, 'McLaren'],
  [F1Team.Mercedes, 'Mercedes'],
  [F1Team.RacingBulls, 'Racing Bulls'],
  [F1Team.RedBull, 'Red Bull Racing'],
  [F1Team.Williams, 'Williams'],
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
  ['Oliver BEARMAN', F1Pilot.Bearman],
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

const DriverEnumToCountryMap = new Map<F1Pilot, F1Country>([
  /** Alpine */
  [F1Pilot.Colapinto, F1Country.Argentina],
  [F1Pilot.Gasly, F1Country.France],
  /** Aston Martin */
  [F1Pilot.Alonso, F1Country.Spain],
  [F1Pilot.Stroll, F1Country.Canada],
  /** Ferrari */
  [F1Pilot.Hamilton, F1Country.UnitedKingdom],
  [F1Pilot.Leclerc, F1Country.Monaco],
  /** Haas */
  [F1Pilot.Bearman, F1Country.UnitedKingdom],
  [F1Pilot.Ocon, F1Country.France],
  /** Kick Sauber */
  [F1Pilot.Bortoleto, F1Country.Brazil],
  [F1Pilot.Hulkenberg, F1Country.Germany],
  /** McLaren */
  [F1Pilot.Norris, F1Country.UnitedKingdom],
  [F1Pilot.Piastri, F1Country.Australia],
  /** Mercedes */
  [F1Pilot.Antonelli, F1Country.Italy],
  [F1Pilot.Russell, F1Country.UnitedKingdom],
  /** Racing Bulls */
  [F1Pilot.Hadjar, F1Country.France],
  [F1Pilot.Lawson, F1Country.NewZealand],
  /** Red Bull */
  [F1Pilot.Tsunoda, F1Country.Japan],
  [F1Pilot.Verstappen, F1Country.Netherlands],
  /** Williams */
  [F1Pilot.Albon, F1Country.Thailand],
  [F1Pilot.Sainz, F1Country.Spain],
]);

export {
  ApiDriverNameToDriverEnumMap,
  ApiTeamNameToTeamEnumMap,
  DriverEnumToCountryMap,
  TeamEnumToTeamNameMap,
  TeamEnumToApiTeamNameMap,
};
