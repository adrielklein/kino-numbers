import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchGames } from './kinoAPI';

export const INITIAL_MIN_FETCHED_GAMES = 15;

export interface KinoState {
  games: GameType[];
  status: 'idle' | 'loading' | 'failed';
  oldestDrawId: string | null;
  minFetchedGames: number;
}

const initialState: KinoState = {
  games: [],
  status: 'idle',
  oldestDrawId: null,
  minFetchedGames: INITIAL_MIN_FETCHED_GAMES,
};

export interface GameDate {
  d: string;
  m: string;
  year: string;
}

export interface GameType {
  gameNumber: string;
  gameDate: GameDate;
  bonus: number;
  drawNumbers: string[];
  game_url: string;
}

export const fetchGamesAsync = createAsyncThunk(
  'kino/fetchGames',
  async (oldestDrawId: string | null) => {
    const response = await fetchGames(oldestDrawId);
    return response.data;
  }
);

export const kinoSlice = createSlice({
  name: 'kino',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increaseMinFetchedGames: (state) => {
      state.minFetchedGames += 10;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action: PayloadAction<GameType[]>) => {
        state.status = 'idle';
        const gameNumbers = state.games.map(game => game.gameNumber)
        const uniqueNewGames = action.payload.filter(game => !gameNumbers.includes(game.gameNumber));
        const allGames = [...state.games, ...uniqueNewGames]
        state.games = allGames;
        state.oldestDrawId = allGames[allGames.length - 1]?.gameNumber;
      })
      .addCase(fetchGamesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectGames = (state: RootState) => state.kino.games;
export const selectStatus = (state: RootState) => state.kino.status;
export const selectOldestDrawId = (state: RootState) => state.kino.oldestDrawId;
export const selectMinFetchedGames = (state: RootState) => state.kino.minFetchedGames;

export const { increaseMinFetchedGames } = kinoSlice.actions;



export default kinoSlice.reducer;
