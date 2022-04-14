const Tile = ({
  backgroundColor,
  x,
  y,
  borders,
  selectedTiles,
  setSelectedTiles,
  isLMBDown,
}) => {
  const style = {
    backgroundColor,
  };

  const classes = ['tile', ...borders].join(' ');

  return (
    <div
      onMouseDown={e => {
        const x = +e.target.dataset.x;
        const y = +e.target.dataset.y;
        const newSelectedTiles = [...selectedTiles];
        newSelectedTiles[y][x] = !newSelectedTiles[y][x];
        setSelectedTiles(newSelectedTiles);
      }}
      onMouseEnter={e => {
        if (e.buttons === 1) {
          const x = +e.target.dataset.x;
          const y = +e.target.dataset.y;
          const newSelectedTiles = [...selectedTiles];
          newSelectedTiles[y][x] = !newSelectedTiles[y][x];
          setSelectedTiles(newSelectedTiles);
        }
      }}
      className={classes}
      style={style}
      data-x={`${x}`}
      data-y={`${y}`}
    ></div>
  );
};

export default Tile;
