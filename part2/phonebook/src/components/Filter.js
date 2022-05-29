const Filter = ({ searchText, onSearchTextChange }) => {
    const handleSearchTextChange = (event) => {
        onSearchTextChange(event.target.value);
    }

    return (
        <p>
            filter shown with
            <input value={searchText} onChange={handleSearchTextChange} />
        </p>
    )
}

export default Filter;