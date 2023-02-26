import kinoReducer, {
  GameType,
  increaseMinFetchedGames,
  KinoState,
  setSelectedGame,
} from './kinoSlice';

const sampleGame: GameType = {
  gameNumber: '123',
  gameDate: {
    d: '01',
    m: '01',
    year: '1999',
  },
  bonus: 0,
  drawNumbers: ['01', '25', '13'],
  game_url: 'https://example.com',
}

describe('keno reducer', () => {
  const initialState: KinoState = {
    games: [],
    status: 'idle',
    oldestDrawId: null,
    minFetchedGames: 15,
    selectedGame: null,
  };
  it('should handle initial state', () => {
    expect(kinoReducer(undefined, { type: 'unknown' })).toEqual({
      games: [],
      status: 'idle',
      oldestDrawId: null,
      minFetchedGames: 15,
      selectedGame: null,
    });
  });

  it('should handle increaseMinFetchedGames', () => {
    const actual = kinoReducer(initialState, increaseMinFetchedGames());
    expect(actual.minFetchedGames).toEqual(25);
  })

  it('should handle setSelectedGame', () => {
    const actual = kinoReducer(initialState, setSelectedGame(sampleGame));
    expect(actual.selectedGame).toEqual(sampleGame);
  })

});
