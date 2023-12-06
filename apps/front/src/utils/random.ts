export const randomNumber = (start: number, end: number) => {
  return Math.random() * (start - end) + end;
};

export const randomBool = (): boolean => {
  return Boolean(Math.round(randomNumber(0, 1)));
};
