export const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|e|shorts|user)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const SECONDS_IN_A_MINUTE = 60;
  const SECONDS_IN_AN_HOUR = 3600;
  const SECONDS_IN_A_DAY = 86400;
  const SECONDS_IN_A_MONTH = 2592000;

  if (diffInSeconds < SECONDS_IN_A_MINUTE) {
    return 'just now';
  } else if (diffInSeconds < SECONDS_IN_AN_HOUR) {
    const minutes = Math.floor(diffInSeconds / SECONDS_IN_A_MINUTE);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < SECONDS_IN_A_DAY) {
    const hours = Math.floor(diffInSeconds / SECONDS_IN_AN_HOUR);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < SECONDS_IN_A_MONTH) {
    const days = Math.floor(diffInSeconds / SECONDS_IN_A_DAY);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toDateString();
  }
}
