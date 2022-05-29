import { useState } from 'react';

const PersonForm = ({ addNewPerson }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        }
        if (addNewPerson(newPerson)) {
            setNewName('');
            setNewNumber('');
        }
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form >
    )
}

export default PersonForm;