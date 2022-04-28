import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Tile from './Tile';

const App = ({ rows, columns }) => {
  const count = useSelector(state => state.countReducer.count);
  const board = useSelector(state => state.boardReducer.board);

  const gridColumnsStyle = useMemo(
    () => ({
      gridTemplateColumns: '1fr '.repeat(columns),
    }),
    [columns]
  );

  const getBordersArray = (indexR, indexC) => {
    const borders = [];
    switch (indexR) {
      case 0:
        borders.push('border-top');
        if (!board[indexR + 1][indexC]) borders.push('border-bottom');
        break;
      case rows - 1:
        borders.push('border-bottom');
        if (!board[indexR - 1][indexC]) borders.push('border-top');
        break;
      default:
        if (!board[indexR - 1][indexC]) borders.push('border-top');
        if (!board[indexR + 1][indexC]) borders.push('border-bottom');
        break;
    }

    switch (indexC) {
      case 0:
        borders.push('border-left');
        if (!board[indexR][indexC + 1]) borders.push('border-right');
        break;
      case columns - 1:
        borders.push('border-right');
        if (!board[indexR][indexC - 1]) borders.push('border-left');
        break;
      default:
        if (!board[indexR][indexC - 1]) borders.push('border-left');
        if (!board[indexR][indexC + 1]) borders.push('border-right');
        break;
    }
    return borders;
  };

  return (
    <div className="content">
      <div className="board" style={gridColumnsStyle}>
        {board.map((row, indexR) =>
          row.map((currentTile, indexC) => {
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
                borders={currentTile ? getBordersArray(indexR, indexC) : ''}
              />
            );
          })
        )}
      </div>
      <div className="count">You selected {count} tiles</div>
    </div>
  );
};

export default App;
