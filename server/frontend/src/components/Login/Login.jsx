import React, { useState } from 'react';
import Header from '../Header/Header';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUrl = window.location.origin + '/djangoapp/login';

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });
    const json = await res.json();
    if (json.status != null && json.status === 'Authenticated') {
      sessionStorage.setItem('username', json.userName);
      window.location.href = '/';
    } else {
      setError('The user could not be authenticated.');
    }
  };

  return (
    <div>
      <Header />
      <div className="panel">
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">Username</label>
            <input id="username" type="text" className="form-control" placeholder="Username"
              onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="form-control" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="d-flex gap-2">
            <input className="btn btn-accent" type="submit" value="Login" />
            <a className="btn btn-outline-secondary" href="/">Cancel</a>
          </div>
          <p className="mt-3 mb-0">No account yet? <a href="/register">Register now</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
