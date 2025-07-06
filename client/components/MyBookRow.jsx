import React from 'react';

const MyBookRow = ({ title, author, isbn, condition, users_books_id, rerender }) => {
  const deleteMyOldBook = () => {
    fetch('/api/deleteOldBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ myOldBookId: users_books_id })
    })
      .then(response => response.json())
      .then(() => {
        rerender();
      });
  };

  console.log('MyBookRow props:', { title, author, isbn, condition, users_books_id });

  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{isbn}</td>
      <td>{condition}</td>
      <td>
        <center>
          <button type="button" className="req-button" onClick={deleteMyOldBook}>
            delete
          </button>
        </center>
      </td>
    </tr>
  );
};

export default MyBookRow;
