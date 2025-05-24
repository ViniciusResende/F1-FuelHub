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

export interface PitstopDTO {
  year: number;
  time: number;
  driver: string;
  team: string | null;
  number: number;
}

export interface TopSpeedDTO {
  year: number;
  sessionKey: number;
  speed: number;
  driver: string;
  team: string | null;
  number: number;
}
