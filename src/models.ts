export interface ITracks {
  count: number;
  next: string | null;
  previous: string | null;
  results: ITrack[];
}

export interface ITrack {
  id: number;
  name: string;
  author: string;
  release_date?: string | null;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo?: string | null;
  track_file?: string;
  stared_user: number[];
}