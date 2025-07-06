import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = ({ loggedIn, error, changeState }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordconfirm: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        changeState(data);
      })
      .catch(err => {
        console.error('Registration error:', err);
      });
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="usercred-box">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="usercred-title">Book Exchange</div>
      <form className="usercred-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} required />
        <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} required />
        <input type="password" placeholder="confirm password" name="passwordconfirm" value={formData.passwordconfirm} onChange={handleChange} required />
        <input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="tel" placeholder="phone number" name="phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" placeholder="zipcode" name="address" value={formData.address} onChange={handleChange} required />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
