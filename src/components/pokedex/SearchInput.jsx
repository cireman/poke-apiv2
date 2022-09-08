import React from "react";

const SearchInput = ({ setPokeSearch, setChosenType }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setChosenType("All");
    setPokeSearch(e.target.searchText.value.trim().toLowerCase());
    e.target.searchText.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="searchText" type="text" />
      <button>Search</button>
    </form>
  );
};

export default SearchInput;
