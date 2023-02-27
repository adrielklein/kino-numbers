import axios from 'axios';


const DRAWINGS_URL = "https://kino.enete.net";


export const fetchGames = (oldestDrawId: string | null) => {
  const params = { drawid: oldestDrawId, number: 10 };
  return axios.get(DRAWINGS_URL, oldestDrawId ? { params } : {})
}
