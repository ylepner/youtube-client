/* eslint-disable no-unused-vars */
export enum StripeColor {
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
  Red = 'red',
}

export function getColorOfItem(date: string | undefined) {
  const days = getDaysOfPublished(date);
  if (days) {
    if (days <= 7) {
      return StripeColor.Blue;
    }
    if (days <= 30) {
      return StripeColor.Green;
    }
    if (days <= 180) {
      return StripeColor.Yellow;
    }
  }
  return StripeColor.Red;
}

export function getDaysOfPublished(date: string | undefined) {
  if (date) {
    const now = new Date();
    const datePrev = new Date(date);
    const differenceInDays =
      (now.getTime() - datePrev.getTime()) / (1000 * 3600 * 24);
    return differenceInDays;
  }
  return 0;
}
