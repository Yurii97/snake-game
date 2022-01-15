export default function End({ restart }) {
  const users = localStorage.getItem('users');
  const parseUsers = JSON.parse(users);
  console.log(parseUsers);
  const sortUsers = parseUsers.sort((a, b) => b.score - a.score);
  return (
    <div>
      Game Over!!
      <ul>
        {sortUsers.map((el, ind) => (
          <li key={el.name}>
            <span>
              {ind + 1}. {el.name} : {el.score}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => restart()}>
        New Game
      </button>
    </div>
  );
}
