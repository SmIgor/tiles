import { useMemo, useState } from 'react';
import Tile from './Tile';

const App = ({ rows, columns }) => {
  const board = useMemo(
    () =>
      Array(rows)
        .fill(false)
        .map(() => Array(columns).fill(false)),
    [rows, columns]
  );

  const [selectedTiles, setSelectedTiles] = useState(board);
  const [selectedTilesCount, setSelectedTilesCount] = useState(0);

  const gridColumnsStyle = useMemo(
    () => ({
      gridTemplateColumns: Array(columns).fill('1fr').join(' '),
    }),
    [columns]
  );

  const getBordersArray = (indexR, indexC) => {
    const borders = [];
    switch (indexR) {
      case 0:
        borders.push('border-top');
        if (!selectedTiles[indexR + 1][indexC]) borders.push('border-bottom');
        break;
      case rows - 1:
        borders.push('border-bottom');
        if (!selectedTiles[indexR - 1][indexC]) borders.push('border-top');
        break;
      default:
        if (!selectedTiles[indexR - 1][indexC]) borders.push('border-top');
        if (!selectedTiles[indexR + 1][indexC]) borders.push('border-bottom');
        break;
    }

    switch (indexC) {
      case 0:
        borders.push('border-left');
        if (!selectedTiles[indexR][indexC + 1]) borders.push('border-right');
        break;
      case columns - 1:
        borders.push('border-right');
        if (!selectedTiles[indexR][indexC - 1]) borders.push('border-left');
        break;
      default:
        if (!selectedTiles[indexR][indexC - 1]) borders.push('border-left');
        if (!selectedTiles[indexR][indexC + 1]) borders.push('border-right');
        break;
    }
    return borders;
  };

  return (
    <div className="content">
      <div className="board" style={gridColumnsStyle}>
        {board.map((row, indexR) =>
          row.map((_, indexC) => {
            let newIndex = indexC;
            if (indexR % 2 === 1) newIndex += 1;

            let color = '';
            newIndex % 2 === 0 ? (color = '#000000') : (color = '#14213d');

            return (
              <Tile
                key={`${indexR}${indexC}`}
                backgroundColor={color}
                x={indexC}
                y={indexR}
                borders={
                  selectedTiles[indexR][indexC]
                    ? getBordersArray(indexR, indexC)
                    : ''
                }
                selectedTiles={selectedTiles}
                setSelectedTiles={setSelectedTiles}
                selectedTilesCount={selectedTilesCount}
                setSelectedTilesCount={setSelectedTilesCount}
              />
            );
          })
        )}
      </div>
      <div className="count">You selected {selectedTilesCount} tiles</div>
    </div>
  );
};

export default App;
