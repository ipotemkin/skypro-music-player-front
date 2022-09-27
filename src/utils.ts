import { IStaredUser, ITrack } from "./models";

export const secondsToMinSec = (secondsIn: number) => {
  const minutes = Math.floor(secondsIn / 60);
  const seconds = secondsIn % 60;

  let secondsStr = String(seconds);
  if (seconds < 10) secondsStr = '0' + secondsStr;

  return `${minutes}:${secondsStr}`;
}

export const parseJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(base64);
}

export const getUserIdFromJWT = (token: string) => {
  return parseJWT(token).user_id;
}

export const getJWTExpTime = (token: string) => {
  return new Date(+parseJWT(token).exp*1000);
}

export const checkJWTExpTime = (token: string) => {
  return new Date() < getJWTExpTime(token);
}

export const getFavoriteTracksByUserId = (tracks: ITrack[], userID: number) => {
  return tracks.filter(
    (track: ITrack) => track.stared_user.find((el: IStaredUser) => el.id === userID)
  );
}

export const getFavoriteTracksByUserToken = (tracks: ITrack[], token?: string) => {
  if (!token) return [];
  return getFavoriteTracksByUserId(tracks, getUserIdFromJWT(token));
}
