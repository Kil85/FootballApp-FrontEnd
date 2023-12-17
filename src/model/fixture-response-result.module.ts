export interface League {
  id: number;
  name: string;
  logo: string;
  country: Country | null;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Match {
  id: number;
  referee: string | null;
  timeZone: string;
  date: string;
  time: string;
  status: string;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface MatchResponse {
  result: Match[][];
}
