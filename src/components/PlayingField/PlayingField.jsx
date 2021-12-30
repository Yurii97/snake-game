import { useState } from 'react';
import { FieldGame, FieldBox, FoodBox, SnakeBox } from './fPlayingField.styled';

function PlayingField({ field }) {
  console.log(field.length);
  const { snakeSegments, setSnakeSegments } = useState([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 6 },
  ]);

  let foodItem = {
    x: Math.floor(Math.random() * field.length),
    y: Math.floor(Math.random() * field.length),
  };

  function getItem(x, y, snakeSegments) {
    if (foodItem.x === x && foodItem.y === y) {
      return '1';
    }
    for (const segment of snakeSegments) {
      if (segment.x === x && segment.y === y) {
        return '2';
      }
    }
  }

  return (
    <>
      <FieldGame>
        {field.map(y => (
          <div key={y}>
            {field.map(x => (
              <FieldBox key={x}> {getItem(x, y, snakeSegments) || '.'}</FieldBox>
            ))}
          </div>
        ))}
      </FieldGame>
    </>
  );
}

export default PlayingField;
