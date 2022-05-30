import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log('fetched persons');
        setPersons(response.data)
      })
  }, [])

  const handleSearchTextChange = (newSearchText) => {
    setSearchText(newSearchText);
  }

  const addPerson = (newPerson) => {
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return false;
    }
    setPersons(persons.concat(newPerson));
    return true;
  }

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().includes(
      searchText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} onSearchTextChange={handleSearchTextChange} />
      <h3>Add a new</h3>
      <PersonForm addNewPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div >
  )
}

export default App