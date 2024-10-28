import React, { useState } from "react";
import styles from './App.module.css';

function ContactForm({ onSubmit }) {
  const [ name, setName ] = useState('');
  const [ number, setNumber ] = useState('');
    
const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name === 'name') {
        setName(value)
    } else if (name === 'number' ) {
        setNumber(value)
    }
  }

 const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }

  onSubmit(name, number);

    setName('');
    setNumber('');
  };

 const handleKeyPress = (event) => {
    const charCode = event.keyCode;
    if (!(charCode >= 48 && charCode <= 57) && charCode !== 43) {
      event.preventDefault();
    }
  }

    return (
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z])$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputChange}
            className={styles.input}
            autoComplete="name"
          />

          <label htmlFor="numberInput">Number</label>
          <input
            type="tel"
            name="number"
            id="numberInput"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={styles.input}
            autoComplete="tel"
          />

          <button type="submit" className={styles.button}>Add contact</button>
        </form>
      </div>
    );
  }

export default ContactForm;