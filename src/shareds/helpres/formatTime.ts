export const formatToHHMM = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatToDDMMYY = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString().slice(-2);
  return `${day}.${month}.${year}`;
};

export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatToDDMONTHYYYY = (dateString: string): string => {
  const newDate = new Date(dateString);
  const formatedDate = Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
    .format(newDate);
  return formatedDate.slice(0, -3);
};

export const formatTimestampToDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const convertTimestampToISOString = (timestamp: string) => {
  const date = new Date(timestamp);

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)?.toISOString();
};
