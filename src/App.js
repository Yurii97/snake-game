import './App.css';
import React from 'react';

const FOODS = ['food1', 'food2', 'food3'];
const AVALIBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
const SPEED = 500;

const App = () => {
  const [score, setSkore] = React.useState(0);
  const [name, setName] = React.useState('');
  const [fieldSize, setFieldSize] = React.useState(8);
  const [statusGame, setSatusGame] = React.useState('form');
  const [isPause, setIsPause] = React.useState(false);
  const [direction, setDirection] = React.useState(AVALIBLE_MOVES[2]);
  const [snake, setSnake] = React.useState([[1, 1]]);
  const [food, setFood] = React.useState([4, 1, 'food1']);
  const FIELD_ROW = [...new Array(fieldSize).keys()];

  const handleKeyDown = e => {
    AVALIBLE_MOVES.includes(e.code) && setDirection(e.code);
    console.log(e.code);
    if (e.code === 'Space') {
      // setIsPause(!isPause);
      setIsPause(prevState => !prevState);
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    // const interval = !isPause && gameLoop();
    const interval = gameLoop();
    return () => clearInterval(interval);
  }, [snake]);

  const submitForm = dat => {
    setSatusGame('game');
  };

  const inputName = e => {
    const { value } = e.target;
    setName(value);
  };
  const onSelectFieldSize = e => {
    const { value } = e.target;
    setFieldSize(Number(value));
  };
  const checkAvalibleSlot = position => {
    switch (true) {
      case position >= fieldSize:
        return 0;
      case position < 0:
        return fieldSize - 1;
      default:
        return position;
    }
  };

  const totalFood = data => {
    switch (data) {
      case 'food1':
        setSkore(skore => skore + 1);
        break;
      case 'food2':
        setSkore(prevState => prevState + 10);
        break;
      case 'food3':
        setSkore(prevState => prevState + 50);
        break;
      default:
    }
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * fieldSize),
        Math.floor(Math.random() * fieldSize),
        FOODS[Math.floor(Math.random() * FOODS.length)],
      ];
    } while (snake.some(el => el[0] === newFood[0] && el[1] === newFood[1]));
    setFood(newFood);
  };

  const gameLoop = () => {
    const timerId = setInterval(() => {
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
        default:
          move = [1, 0];
      }
      const headSnake = [
        checkAvalibleSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkAvalibleSlot(newSnake[newSnake.length - 1][1] + move[1]),
      ];
      newSnake.push(headSnake);
      let spliceIndex = 1;
      if (headSnake[0] === food[0] && headSnake[1] === food[1]) {
        spliceIndex = 0;
        totalFood(food[2]);
        generateFood();
      }
      setSnake(newSnake.splice(spliceIndex));
    }, SPEED);
    return timerId;
  };

  return (
    <>
      {statusGame === 'form' && (
        <>
          <form onSubmit={submitForm} className="form">
            <label>
              Name
              <input
                type="text"
                onChange={inputName}
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </label>
            <label>
              {' '}
              select the playing field
              <select onChange={onSelectFieldSize}>
                <option value="8">8x8</option>
                <option value="10">10x10</option>
                <option value="15">15x15</option>
              </select>
            </label>
            <button type="submit">Start Game</button>
          </form>
        </>
      )}
      {statusGame === 'game' && (
        <div className="gameField">
          <span>Score : {score}</span>
          {FIELD_ROW.map(y => (
            <div key={y} className="field">
              {FIELD_ROW.map(x => {
                let type = snake.some(e => e[0] === y && e[1] === x) && 'snake';
                if (type !== 'snake') {
                  type = food[0] === y && food[1] === x && food[2];
                }
                return <div key={x} className={`cell ${type}`}></div>;
              })}
            </div>
          ))}
        </div>
      )}

      {statusGame === 'end' && (
        <div>
          <ul></ul>
        </div>
      )}
    </>
  );
};

export default App;