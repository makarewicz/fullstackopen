const Person = ({ person, onRemovePerson }) => {

    const handleRemove = (event) => {
        event.preventDefault();
        onRemovePerson(person.id);
    }

    return <li>{person.name} {person.number}
        <input type="button" onClick={handleRemove} value="remove" /></li>
}

const Persons = ({ persons, onRemovePerson }) => (
    <ul style={{ listStyleType: "none", paddingInlineStart: 5 }}>
        {persons.map(person => <Person key={person.id} person={person}
            onRemovePerson={onRemovePerson} />)}
    </ul >
)

export default Persons;