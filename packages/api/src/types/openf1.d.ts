export interface OpenF1Driver {
  driver_number: number;
  driver_name: string;
  full_name: string;
  country_code: string;
  headshot_url: string | null;
  broadcast_name: string;
  team_name: string | null;
  first_name: string;
  last_name: string;
  meeting_key?: number;
  session_key?: number;
}

export interface RawPit {
  date: string;
  pit_duration: number;
  driver_number: number;
}

export interface SessionRaw {
  session_key: number;
  session_type: 'Race' | string;
  date_start: string;
}

export interface LapRaw {
  driver_number: number;
  st_speed: number | null;
}
