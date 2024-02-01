import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

// Function to format time in minutes and seconds
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Function to parse time in minutes and seconds format to seconds
const parseTimeToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(parseFloat);
  return (minutes * 60) + seconds;
};

// Initialize player
player.ready().then(() => {
  // Retrieve playback time from local storage on page load
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    const totalSeconds = parseTimeToSeconds(currentTime);
    player.setCurrentTime(totalSeconds);
  }

  // Track playback time update and save to local storage
  player.on('timeupdate', throttle((data) => {
    const currentTime = data.seconds;
    const formattedTime = formatTime(currentTime);
    console.log('Current playback time:', formattedTime);
    localStorage.setItem('videoplayer-current-time', formattedTime);
  }, 1000));
});
