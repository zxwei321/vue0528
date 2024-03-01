import dayjs from 'dayjs';

export const relativeTime = value => {
  return dayjs ().to (dayjs (value));
};

export const formatTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs (value).format (format);
};
