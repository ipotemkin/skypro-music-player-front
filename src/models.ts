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
  stared_user: IStaredUser[];
}

export interface IStaredUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IFilterItem {
  value: string;
  selected: boolean;
}

export interface IUserTokens {
  access: string;
  refresh: string;
}

export type FiledNames = 'author' | 'name' | 'genre' | 'release_date';

export type FilterData = {
  field: FiledNames
  query: string[]
}
