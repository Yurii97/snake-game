import { useState } from 'react';

export default function Form({ submitForm }) {
  const [name, setName] = useState('');
  const [fieldSize, setFieldSize] = useState(8);

  const inputName = e => {
    const { value } = e.target;
    setName(value);
  };
  const onSelectFieldSize = e => {
    const { value } = e.target;
    setFieldSize(Number(value));
  };
  return (
    <form onSubmit={() => submitForm(name, fieldSize)} className="form">
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
  );
}
