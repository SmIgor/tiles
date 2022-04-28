import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTileAction } from './store/boardReducer';
import { decrementAction, incrementAction } from './store/countReducer';

const Tile = ({ backgroundColor, x, y, borders }) => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.boardReducer.board);

  const style = useMemo(
    () => ({
      backgroundColor,
    }),
    [backgroundColor]
  );

  const currentTile = board[y][x];
  const classes = useMemo(() => {
    let classes = ['tile'];
    if (currentTile) {
      classes.push('selected');
    }
    return (classes = classes.concat(borders).join(' '));
  }, [borders, currentTile]);

  const updateSelectedTiles = e => {
    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;

    dispatch(toggleTileAction({ x, y }));
    board[y][x] ? dispatch(decrementAction()) : dispatch(incrementAction());
  };

  return (
    <div
      onMouseDown={e => {
        if (e.button === 0) updateSelectedTiles(e);
      }}
      onMouseEnter={e => {
        if (e.buttons === 1) updateSelectedTiles(e);
      }}
      style={style}
      className={classes}
      data-x={`${x}`}
      data-y={`${y}`}
    ></div>
  );
};

export default React.memo(Tile);
