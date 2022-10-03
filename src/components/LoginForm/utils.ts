export const truncate = (text: string, n: number) => {
  return text.length > n
    ? text.slice(0, n) + '...'
    : text;
}

export const getFirstSentense = (text: string) => {
  return text.split('.')[0];
}
