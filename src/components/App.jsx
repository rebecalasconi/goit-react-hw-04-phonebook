import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'; 
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import styles from './App.module.css';

function App() {
  const [ contacts, setContacts ] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])

    const [ filter, setFilter ] = useState('');

  // Încarcă datele din localStorage la montarea componentului
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  // Actualizează localStorage când contactele se schimbă
  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

  const handleDeleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
    };

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(contact => contact.name === name);

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number
    };

    setContacts(prevContacts => [...prevContacts, newContact])
    };

 const handleFilterChange = (filter) => {
    setFilter(filter);
  };

 const getFilteredContacts = () => {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const filteredContacts = getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
      </div>
    );
  }
export default App;