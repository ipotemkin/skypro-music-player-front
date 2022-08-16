export const SecondsToMinSec = (secondsIn: number) => {
  const minutes = Math.floor(secondsIn / 60);
  const seconds = secondsIn % 60;

  let secondsStr = String(seconds);
  if (seconds < 10) secondsStr = '0' + secondsStr;

  return `${minutes}:${secondsStr}`;
}
