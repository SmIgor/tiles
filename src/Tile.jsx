import { useMemo } from 'react';

const Tile = ({
  backgroundColor,
  x,
  y,
  borders,
  selectedTiles,
  setSelectedTiles,
  selectedTilesCount,
  setSelectedTilesCount,
}) => {
  const style = useMemo(
    () => ({
      backgroundColor,
    }),
    [backgroundColor]
  );

  const classes = useMemo(() => ['tile', ...borders].join(' '), [borders]);

  const updateSelectedTiles = e => {
    e.target.classList.toggle('selected');

    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;
    const newSelectedTiles = [...selectedTiles];
    newSelectedTiles[y][x] = !newSelectedTiles[y][x];
    setSelectedTiles(newSelectedTiles);

    let newCount = selectedTilesCount;
    newSelectedTiles[y][x] ? newCount++ : newCount--;
    setSelectedTilesCount(newCount);
  };

  return (
    <div
      onMouseDown={e => updateSelectedTiles(e)}
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

export default Tile;
