import React, { useMemo } from 'react';

const Tile = ({
  backgroundColor,
  x,
  y,
  borders,
  selectedTiles,
  setSelectedTiles,
}) => {
  const style = useMemo(
    () => ({
      backgroundColor,
    }),
    [backgroundColor]
  );

  const classes = useMemo(() => {
    let classes = ['tile'];
    if (selectedTiles[y][x]) {
      classes.push('selected');
    }
    return (classes = [...classes, ...borders].join(' '));
  }, [borders]);

  const updateSelectedTiles = e => {
    const x = +e.target.dataset.x;
    const y = +e.target.dataset.y;
    const newSelectedTiles = [...selectedTiles];
    newSelectedTiles[y][x] = !newSelectedTiles[y][x];
    setSelectedTiles(newSelectedTiles);
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

const areEqual = (prevProps, nextProps) => {
  const oldBorders = prevProps.borders;
  const newBorders = nextProps.borders;
  if (
    oldBorders.length !== newBorders.length ||
    typeof oldBorders !== typeof newBorders
  )
    return false;
  if (typeof oldBorders === 'string' && typeof newBorders === 'string')
    return true;
  oldBorders.forEach((str1, index) => {
    const str2 = newBorders[index];
    if (str1 !== str2) return false;
  });
  return true;
};

export default React.memo(Tile, areEqual);
