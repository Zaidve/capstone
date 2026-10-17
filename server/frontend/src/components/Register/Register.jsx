import React, { useState } from 'react';
import './Register.css';
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    const registerUrl = window.location.origin + '/djangoapp/register';

    const res = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === 'Already Registered') {
      alert('The user with same username is already registered');
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container panel">
        <div className="header d-flex justify-content-between align-items-center">
          <h2 className="text">Sign Up</h2>
          <button type="button" className="btn-close" aria-label="Close" onClick={gohome}></button>
        </div>

        <form onSubmit={register}>
          <div className="inputs">
            <div className="input mb-3">
              <span className="input-icon">👤</span>
              <input type="text" name="username" placeholder="Username" className="input_field form-control"
                onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <span className="input-icon">🪪</span>
              <input type="text" name="first_name" placeholder="First Name" className="input_field form-control"
                onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <span className="input-icon">🪪</span>
              <input type="text" name="last_name" placeholder="Last Name" className="input_field form-control"
                onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <span className="input-icon">✉️</span>
              <input type="email" name="email" placeholder="Email" className="input_field form-control"
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <span className="input-icon">🔒</span>
              <input type="password" name="psw" placeholder="Password" className="input_field form-control"
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="submit_panel">
            <input className="submit btn btn-accent w-100" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
