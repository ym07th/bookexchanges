import { useNavigate } from 'react-router-dom';
import React from 'react';
const SearchBookRow = (props) => {
  const navigate = useNavigate();

  const requestBook = (e) => {
    e.preventDefault();
    console.log('requestBook props:', props);
    fetch('/api/requestBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        userId: props.userId, 
        isbn: props.isbn, 
        username: props.username
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Request failed');
        // return response.json();
      })
      .then(() => {
        navigate('/exchange'); // ✅ React Router v6 way to navigate
      })
      .catch(err => console.log('client error: ' + err));
  };

  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.isbn}</td>
      <td>{props.condition}</td>
      <td>{props.username}</td>
      <td>
        <center>
          <button type="button" className="req-button" onClick={requestBook}>
            Request
          </button>
        </center>
      </td>
    </tr>
  );
};

export default SearchBookRow;
