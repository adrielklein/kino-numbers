import axios from 'axios';

export const fetchGames = () => {
  return axios.get('https://puertorico.secondchancebonuszone.com/kino/past_drawings.php')
}
