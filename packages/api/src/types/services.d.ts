export interface DriverDTO {
  number: number;
  name: string;
  country: string;
  team: string | null;
  headshot: string | null;
}

export interface PodiumDriver extends DriverDTO {
  first: number;
  second: number;
  third: number;
  total: number;
}
