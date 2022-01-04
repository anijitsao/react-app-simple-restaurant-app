// SearchBar component
export default ({ searchText, searchTextChange, searchByValue }) => {
  return (
    <div className="search-bar">
      <input
        className="search-box"
        type="text"
        value={searchText}
        onKeyPress={searchTextChange}
        onChange={searchTextChange}
        placeholder="Search restaurants by name, cuisines etc."
      />
      <i className="fa fa-search search-icon"></i>

      <button
        className="btn search-btn"
        onClick={() => searchByValue(searchText)}
      >
        {" "}
        search{" "}
      </button>
    </div>
  )
}
