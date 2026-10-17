import React from 'react';

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    const logoutUrl = window.location.origin + '/djangoapp/logout';
    const res = await fetch(logoutUrl, { method: 'GET' });
    const json = await res.json();
    if (json) {
      const username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert('Logging out ' + username + '...');
    } else {
      alert('The user could not be logged out.');
    }
  };

  const currUser = sessionStorage.getItem('username');
  const path = window.location.pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark brand-nav">
      <div className="container">
        <a className="navbar-brand" href="/">Dealerships</a>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className={'nav-link' + (path === '/' ? ' active' : '')} href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
            <li className="nav-item"><a className={'nav-link' + (path.startsWith('/dealer') ? ' active' : '')} href="/dealers">Dealers</a></li>
          </ul>
          {currUser ? (
            <div>
              <span className="username-badge">{currUser}</span>
              <a className="btn btn-outline-light btn-sm" href="/" onClick={logout}>Logout</a>
            </div>
          ) : (
            <div>
              <a className="btn btn-outline-light btn-sm me-2" href="/login">Login</a>
              <a className="btn btn-accent btn-sm" href="/register">Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
