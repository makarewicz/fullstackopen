import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import people from './services/people';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)

  const timedMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }
  const errorMessage = (text) =>
    timedMessage({ type: 'error', text });
  const successMessage = (text) =>
    timedMessage({ type: 'success', text });

  useEffect(() => {
    people.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleSearchTextChange = (newSearchText) => {
    setSearchText(newSearchText);
  }


  const addPerson = (newPerson) => {
    const oldPerson = persons.find(person => person.name === newPerson.name);
    if (oldPerson) {
      const message =
        `${newPerson.name} is already in the phonebook with number ${oldPerson.number}.
        Replace old number with a ${newPerson.number}?`;
      if (window.confirm(message)) {
        people.update(oldPerson.id, newPerson).then(updatedPerson => {
          setPersons(persons.map(person => person.id === oldPerson.id ? updatedPerson : person))
        }).then(() => successMessage(`Updated ${newPerson.name}`));
        return true;
      } else {
        return false;
      }
    }
    people.create(newPerson).then(addedPerson => {
      setPersons(persons.concat(addedPerson))
    }).then(() => successMessage(`Added ${newPerson.name}`));
    return true;
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id);
    people.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id));
    }).then(() => successMessage(`Removed ${person.name}`))
      .catch(error => {
        if (error.response.status === 404) {
          errorMessage(`${person.name} was not found on server`);
          setPersons(persons.filter(person => person.id !== id));
        }
      });
  }

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().includes(
      searchText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchText={searchText} onSearchTextChange={handleSearchTextChange} />
      <h3>Add a new</h3>
      <PersonForm addNewPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onRemovePerson={removePerson} />
    </div >
  )
}

export default App