import React, { useState, useCallback } from 'react';
import SearchBookRow from '../components/SearchBookRow';

const Search = ({ userId }) => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [searchString, setSearchString] = useState('');

  const searchBook = useCallback((e) => {
    e.preventDefault();

    fetch('/api/findOldBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ searchString }),
    })
      .then((res) => res.json())
      .then((data) => setAvailableBooks(data))
      .catch((err) => console.error('Search error:', err));
  }, [searchString]);

  const rows = [];

  if (availableBooks.length > 0) {
    rows.push(
      <tr key="headers">
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
        <th>Condition</th>
        <th>Owner</th>
        <th></th>
      </tr>
    );

    availableBooks.forEach((book, i) => {
      if (book.username !== 'max') {
        rows.push(
          <SearchBookRow
            key={i}
            {...book}
            userId={userId}
          />
        );
      }
    });
  }

  return (
    <div className="search-box">
      <form className="search-form" onSubmit={searchBook}>
        <input
          type="text"
          placeholder="Search book by title"
          name="title"
          id="searchString"
          required
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>

      <div className="result-box">
        {rows.length > 0 ? (
          <table className="result-table">
            <tbody>{rows}</tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
