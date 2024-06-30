export const convertToIST = (date: Date) => {
  // Create a new Date object with the given date
  const utcDate = new Date(date);

  // Calculate the IST offset (5 hours 30 minutes)
  const ISTOffset = 5.5 * 60 * 60 * 1000;

  // Create a new date object for IST
  const istDate = new Date(utcDate.getTime() + ISTOffset);

  // Format the date string in ISO 8601 format with IST offset
  const isoString = istDate.toISOString().replace("Z", "+05:30");

  return isoString;
};

export const addTime = (date: Date, num: number) => {
  const newDate = new Date(date.getTime() + num * 86400000);
  return newDate;
};
