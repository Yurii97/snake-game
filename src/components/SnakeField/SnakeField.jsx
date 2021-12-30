import React from 'react';
import './SnakeField.css';
// const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
const FOODS = ['food1', 'food2', 'food3'];
const AVALIBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Space'];
const SPEED = 500;

const SnakeField = () => {
  const [direction, setDirection] = React.useState(AVALIBLE_MOVES[2]);
  const [snake, setSnake] = React.useState([[1, 1]]);
  const [food, setFood] = React.useState([4, 1, 'food1']);
  const handleKeyDown = e => {
    AVALIBLE_MOVES.includes(e.code) && setDirection(e.code);
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  React.useEffect(() => {
    const interval = gameLoop();
    return () => clearInterval(interval);
  }, [snake]);

  const checkAvalibleSlot = position => {
    switch (true) {
      case position >= FIELD_SIZE:
        return 0;
      case position < 0:
        return FIELD_SIZE - 1;
      default:
        return position;
    }
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * FIELD_SIZE),
        Math.floor(Math.random() * FIELD_SIZE),
        FOODS[Math.floor(Math.random() * FOODS.length)],
      ];
    } while (snake.some(el => el[0] === newFood[0] && el[1] === newFood[1]));
    setFood(newFood);
  };

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      const newSnake = snake;
      let move = [];
      switch (direction) {
        case AVALIBLE_MOVES[0]:
          move = [1, 0];
          break;
        case AVALIBLE_MOVES[1]:
          move = [-1, 0];
          break;
        case AVALIBLE_MOVES[2]:
          move = [0, 1];
          break;
        case AVALIBLE_MOVES[3]:
          move = [0, -1];
          break;
        case AVALIBLE_MOVES[4]:
          return;
      }
      const headSnake = [
        checkAvalibleSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkAvalibleSlot(newSnake[newSnake.length - 1][1] + move[1]),
      ];
      newSnake.push(headSnake);
      let spliceIndex = 1;
      if (headSnake[0] === food[0] && headSnake[1] === food[1]) {
        spliceIndex = 0;
        generateFood();
      }
      setSnake(newSnake.splice(spliceIndex));
    }, SPEED);
    return timerId;
  };

  return (
    <div>
      {FIELD_ROW.map(y => (
        <div key={y} className="field">
          {FIELD_ROW.map(x => {
            let type = snake.some(e => e[0] === y && e[1] === x) && 'snake';
            if (type !== 'snake') {
              // if (food.some(e => e[0] === y && e[1] === x)) {
              //   type = food[2];
              // }
              // type = food.some(e => e[0] === y && e[1] === x) && food[2];
              type = food[0] === y && food[1] === x && food[2];
              console.log(food[2]);
            }
            return <div key={x} className={`cell ${type}`}></div>;
          })}
        </div>
      ))}
      <div className="cell"></div>
      <div className="cell snake"></div>
      <div className="cell food1"></div>
      <div className="cell food2"></div>
      <div className="cell food3"></div>
    </div>
  );
};

export default SnakeField;
