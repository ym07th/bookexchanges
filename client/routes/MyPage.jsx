import React, { useEffect, useState, useCallback } from 'react';
import MyBookRow from '../components/MyBookRow';

const MyPage = ({ userId }) => {
  const [myOldBooks, setMyOldBooks] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [condition, setCondition] = useState('Like New');

  const getMyOldBooks = useCallback(() => {
    fetch(`/api/getMyOldBookList/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setMyOldBooks(data))
      .catch(err => console.error('Fetch error:', err));
  }, [userId]);

  useEffect(() => {
    if (userId) getMyOldBooks();
  }, [getMyOldBooks, userId]);

  const addOldBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addOldBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          isbn,
          condition,
          userId
        })
      });

      const data = await response.json();
      console.log('Added book:', data);
      getMyOldBooks();
      setIsbn('');
      setCondition('Like New');
    } catch (err) {
      console.error('Add book error:', err);
    }
  };

  const rerender = () => getMyOldBooks();

  return (
    <div className="search-box">
      <form className="search-form" onSubmit={addOldBook}>
        <input
          type="text"
          placeholder="Add book by ISBN"
          name="isbn"
          id="isbn"
          required
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <select
          id="condition"
          name="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="Like New">Like New</option>
          <option value="Fine">Fine</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
        <input type="submit" value="Add" />
      </form>

      <div className="result-box">
        {myOldBooks.length > 0 && (
          <table className="result-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Condition</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOldBooks.map((book, index) => (
                <MyBookRow key={index} {...book} rerender={rerender} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyPage;
