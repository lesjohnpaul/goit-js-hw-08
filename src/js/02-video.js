import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const parseTimeToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(parseFloat);
  return (minutes * 60) + seconds;
};

player.ready().then(() => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    const totalSeconds = parseTimeToSeconds(currentTime);
    player.setCurrentTime(totalSeconds);
  }

  player.on('timeupdate', throttle((data) => {
    const currentTime = data.seconds;
    const formattedTime = formatTime(currentTime);
    console.log('Current playback time:', formattedTime);
    localStorage.setItem('videoplayer-current-time', formattedTime);
  }, 1000));
});
