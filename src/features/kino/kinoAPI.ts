import axios from 'axios';

const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

const DRAWINGS_URL = `${PROXY_URL}https://puertorico.secondchancebonuszone.com/kino/past_drawings.php`;


export const fetchGames = (oldestDrawId: string | null) => {
  const params = { drawid: oldestDrawId, number: 10 };
  return axios.get(DRAWINGS_URL, oldestDrawId ? { params } : {})
}
