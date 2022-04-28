import { columns, rows } from '../boardRC';

const RESET = 'RESET';
const TOGGLE_TILE = 'TOGGLE_TILE';

const initialState = {
  board: Array(rows)
    .fill(false)
    .map(() => Array(columns).fill(false)),
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return { ...state, board: structuredClone(action.payload.newBoard) };

    case TOGGLE_TILE:
      const newSelectedTiles = structuredClone(state.board);
      const { x, y } = action.payload;
      newSelectedTiles[y][x] = !newSelectedTiles[y][x];
      return { ...state, board: newSelectedTiles };

    default:
      return state;
  }
};

export const resetAction = payload => ({ type: RESET, payload });
export const toggleTileAction = payload => ({ type: TOGGLE_TILE, payload });
