import React from "react";
import "./search.style.scss";
function SearchField({ placeholder, handleChange, name }) {
  return (
    <div>
      <input
        className="search-box"
        type="search"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchField;
