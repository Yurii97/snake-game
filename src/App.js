import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/Form/Form.jsx';
import End from './components/End/End';

const FOODS = ['food1', 'food2', 'food3'];
const AVALIBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
const SPEED = 500;

const App = () => {
  const [score, setSkore] = useState(0);
  const [name, setName] = useState('');
  const [fieldSize, setFieldSize] = useState(8);
  const [statusGame, setSatusGame] = useState('form');
  const [isPause, setIsPause] = useState(false);
  const [direction, setDirection] = useState('ArrowRight');
  const [snake, setSnake] = useState([[1, 1]]);
  const [food, setFood] = useState([4, 1, 'food1']);
  const FIELD_ROW = [...new Array(fieldSize).keys()];
  const [listUsers, setListUsers] = useState([]);
  const [speed, setSpeed] = useState(SPEED);

  useEffect(() => {
    // console.log('lisener');
    document.addEventListener('keydown', handleKeyDown);
    return () => {};
  }, []);

  useEffect(() => {
    // console.log('game');
    const interval = !isPause && gameLoop();
    return () => clearInterval(interval);
  }, [snake, isPause]);

  useEffect(() => {
    const users = localStorage.getItem('users');
    const parseUsers = JSON.parse(users);
    if (parseUsers) {
      setListUsers(parseUsers);
    }
    setSpeed(SPEED - Math.floor(score / 50) * 50);
  }, [name, score]);

  const handleKeyDown = e => {
    AVALIBLE_MOVES.includes(e.code) && setDirection(e.code);
    if (e.code === 'Space') {
      toglePause();
    }
  };

  const toglePause = () => {
    setIsPause(prevState => !prevState);
  };

  const submitForm = (name, size) => {
    setSatusGame('game');
    setFieldSize(size);
    setName(name);
  };

  const restart = () => {
    setName('');
    setFieldSize(8);
    setSkore(0);
    setSnake([[1, 1]]);
    setIsPause(false);
    setSatusGame('form');
    setDirection('ArrowRight');
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
        setSkore(skore => skore + 5);
        break;
      case 'food3':
        setSkore(skore => skore + 10);
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

  const collision = headSnake => {
    for (const seg of snake) {
      if (headSnake[0] === seg[0] && headSnake[1] === seg[1]) return true;
    }
  };

  const gameMove = () => {
    switch (direction) {
      case 'ArrowDown':
        return [1, 0];
      case 'ArrowUp':
        return [-1, 0];
      case 'ArrowRight':
        return [0, 1];
      case 'ArrowLeft':
        return [0, -1];
      default:
        return [1, 0];
    }
  };
  const gameLoop = () => {
    const timerId = setInterval(() => {
      const newSnake = snake;
      const move = gameMove();
      const headSnake = [
        checkAvalibleSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkAvalibleSlot(newSnake[newSnake.length - 1][1] + move[1]),
      ];
      if (collision(headSnake, snake)) {
        localStorage.setItem('users', JSON.stringify([...listUsers, { name, score }]));
        toglePause();
        setTimeout(() => {
          setSatusGame('end');
        }, 2000);
      }
      newSnake.push(headSnake);
      let spliceIndex = 1;
      if (headSnake[0] === food[0] && headSnake[1] === food[1]) {
        spliceIndex = 0;
        totalFood(food[2]);
        generateFood();
      }
      setSnake(newSnake.splice(spliceIndex));
    }, speed);
    return timerId;
  };

  return (
    <>
      {statusGame === 'form' && <Form submitForm={submitForm} />}
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

      {statusGame === 'end' && <End restart={restart} />}
    </>
  );
};

export default App;
