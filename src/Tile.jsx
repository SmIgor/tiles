const Tile = ({
  backgroundColor,
  x,
  y,
  borders,
  selectedTiles,
  setSelectedTiles,
}) => {
  const style = {
    backgroundColor,
  };

  let classes = ['tile'];
  const isSelected = selectedTiles[y][x];
  if (isSelected) {
    classes.push('selected');
  }
  classes = [...classes, ...borders].join(' ');

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
      style={style}
      className={classes}
      data-x={`${x}`}
      data-y={`${y}`}
    ></div>
  );
};

export default Tile;
