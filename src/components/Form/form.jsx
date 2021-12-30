function Form() {
  const submitForm = () => {};

  console.log();

  return (
    <form onSubmit={submitForm()}>
      <label>
        Name
        <input
          type="text"
          name="name"
          //   onChange={this.props.setName()}
          //   value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
}
export default Form;
